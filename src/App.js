import React, {Component} from 'react';
import axios from 'axios';
import Header from './Components/Header/Header';
import ToDo from './Components/ToDo/ToDo';
import './App.css';

class App extends Component {
  state = {
    inputText: "",
    toDoList: [],
    date: ""
  }
  
  componentDidMount() {
    let date = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let day = date.getDate();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayOfWeek = days[date.getDay()];
    date = `${dayOfWeek} - ${month} ${day}, ${year}`;
    this.setState({date});
    
    axios.get("https://react-productivity-app.firebaseio.com/posts.json")
      .then(response => {
      
      // let newArr = Object.values(response.data);
      // console.log(newArr)
      
      if(response.data) {
      let keysArr = Object.keys(response.data);
      
      
      /*Next, create a posts array which will hold all todos.
      Here you could use a for-in loop or object.values
      Both the todos and the unique IDs are store in response.data*/
      let postsArr = []
        for(let keys in response.data) {
              postsArr.push(response.data[keys])   
        }
  
      /*Now, we need to loop through both the posts array (postsArr) and the keys array (keysArr)
      and inject a new key value pair into the posts array which contains each post as an object with a unique ID.*/
      /*Here I use a for loop, starting with a counter variable at 0. At each index for the postsArr, I pull 
      the correspdonging key from the keys array and inject it into the posts array.*/
      let counter;
      for(counter = 0; counter < postsArr.length; counter++ ) {
            postsArr[counter].key = keysArr[counter];
            }
      
            /*The result is a postssArr, that has post objects which contain unique keys. Now just setState to the new postArr*/
            this.setState({
                toDoList: postsArr
            });
          }
          
      }); 
  }
  
  deleteCallbackFunction = (childData) => {
      axios({
        method: "put",
        url: `https://react-productivity-app.firebaseio.com/posts/${childData}.json`,
        data: {posts: null},
        contentType: "application/JSON"
    }).then(response => {
      axios.get("https://react-productivity-app.firebaseio.com/posts.json")
      .then(response => {
      if(response.data === null) {
          this.setState({
            toDoList: []
          })
        }
      else {  
      let keysArr = Object.keys(response.data);
  
      let postsArr = []
        for(let keys in response.data) {
              postsArr.push(response.data[keys])   
        }
      let counter;
      for(counter = 0; counter < postsArr.length; counter++ ) {
            postsArr[counter].key = keysArr[counter];
            }
            
      // let newArr = Object.values(response.data);
            this.setState({
                toDoList: postsArr
          });
        }
      });
  });
};

  editCallbackFunction = (childDataKey, childDataPost) => {
    let date = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let day = date.getDate();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayOfWeek = days[date.getDay()];
    date = `${dayOfWeek} - ${month} ${day}, ${year}`;
    
    let data = {
      post: childDataPost,
      time: date
    }
    this.setState({date});
      axios({
        method: "put",
        url: `https://react-productivity-app.firebaseio.com/posts/${childDataKey}.json`,
        data: {posts: data},
        contentType: "application/JSON"
    }).then(response => {
      axios.get("https://react-productivity-app.firebaseio.com/posts.json")
      .then(response => {
      if(response.data === null) {
          this.setState({
            toDoList: []
          })
        }
      else {  
      let keysArr = Object.keys(response.data);
  
      let postsArr = []
        for(let keys in response.data) {
              postsArr.push(response.data[keys])   
        }
      let counter;
      for(counter = 0; counter < postsArr.length; counter++ ) {
            postsArr[counter].key = keysArr[counter];
            }
    
            this.setState({
                toDoList: postsArr
          });
        }
      });
  });
};
  
  onChangeHandler = (event) => {
    this.setState({inputText: event.target.value})
  }
  
  onClickHandler = () => {
    let date = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let day = date.getDate();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayOfWeek = days[date.getDay()];
    date = `${dayOfWeek} - ${month} ${day}, ${year}`;
    
    let data = {
      post: this.state.inputText,
      time: date
    }
    
    axios({
      method: "post",
      url: "https://react-productivity-app.firebaseio.com/posts.json",
      data: {posts: data},
      contentType: "application/JSON"
    }).then(response => {
      this.setState({inputText: ""});
      if(response.data) {
        axios.get("https://react-productivity-app.firebaseio.com/posts.json")
        .then(response => {
        let keysArr = Object.keys(response.data);
    
        let postsArr = []
          for(let keys in response.data) {
                postsArr.push(response.data[keys])   
          }
        let counter;
        for(counter = 0; counter < postsArr.length; counter++ ) {
              postsArr[counter].key = keysArr[counter];
              }
              
              this.setState({
                  toDoList: postsArr
              });
        });
      }
    });
  }
  
  changeData = () => {
    axios({
      method: "put",
      url: "https://react-productivity-app.firebaseio.com/posts/-M7dKnlIw5LTZKZa5BKE.json",
      data: {posts: null},
      contentType: "application/JSON"
    });
  }
  
  render() {
    
    let toDos = this.state.toDoList.map(toDo => {
      return <ToDo
                id={toDo.key}
                key={toDo.key} 
                post={toDo.posts.post} 
                time={toDo.posts.time}
                parentCallback={this.deleteCallbackFunction}
                editParentCallback={this.editCallbackFunction}/>
    })
    
    return (
      <div>
        <Header date={this.state.date} />
        <div className="App container justify-content-center">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-sm-10">
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Enter new todo..."
                  className="form-control"
                  onChange={this.onChangeHandler} 
                  value={this.state.inputText}/>
                  <div className="input-group-append">
                    <button 
                    className="btn btn-info"
                    onClick={this.onClickHandler}>Submit</button>
                  </div>
                </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-sm-10">  
              {toDos}
            </div>
          </div>
        </div>
      </div>
    );    
  }
}

export default App;
