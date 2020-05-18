import React, {Component} from 'react';
import axios from 'axios';
import ToDo from './Components/ToDo/ToDo';
import './App.css';

class App extends Component {
  state = {
    inputText: "",
    toDoList: []
  }
  
  componentDidMount() {
    axios.get("https://react-productivity-app.firebaseio.com/posts.json")
      .then(response => {
      /*First, establish a keys array which will hold the unique ID's that are coming from Firebase*/
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
  
  callbackFunction = (childData) => {
      console.log(childData);
      // let arr = [];
      // let i = 0;
      // for(i=0; i<this.state.toDoList.length; i++) {
      //   arr.push(this.state.toDoList[i].key);
      // };
      // console.log(arr);
      // console.log(arr.indexOf(childData));
      // let index = arr.indexOf(childData);
      // this.state.toDoList.splice(index, 1);
      axios({
        method: "put",
        url: `https://react-productivity-app.firebaseio.com/posts/${childData}.json`,
        data: {posts: null},
        contentType: "application/JSON"
    }).then(response => {
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
    });
      
  }
  
  onChangeHandler = (event) => {
    this.setState({inputText: event.target.value})
  }
  
  onClickHandler = () => {
    console.log(this.state.inputText);
    axios({
      method: "post",
      url: "https://react-productivity-app.firebaseio.com/posts.json",
      data: {posts: this.state.inputText},
      contentType: "application/JSON"
    }).then(response => {
      console.log(response);
      this.setState({inputText: ""});
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
                post={toDo.posts} 
                parentCallback={this.callbackFunction}/>
    })
    
    return (
      <div className="App">
        <input type="text" onChange={this.onChangeHandler} value={this.state.inputText}/>
        <button onClick={this.onClickHandler}>Submit</button>
        {toDos}
        <button onClick={this.changeData}>Go</button>
      </div>
    );    
  }
}

export default App;
