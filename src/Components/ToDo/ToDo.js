import React, {Component} from 'react';
import './ToDo.css';

class ToDo extends Component {
    state = {
        editClicked: false,
        editInputText: ""
    }
    
    deleteData = () => {
        this.props.parentCallback(this.props.id);
    };
    
    editData = () => {
        this.setState({
           editClicked: true 
        });
        
    };
    
    onChangeHandler = event => {
        this.setState({
            editInputText: event.target.value
        })
    };
    
    confirmEditHandler = () => {
        this.props.editParentCallback(this.props.id, this.state.editInputText);
        this.setState({
           editClicked: false 
        });
    };
    
    render() {
        return (
            <ul className="list-group">
                <li className="list-group-item">
                    <div>
                        {!this.state.editClicked ?
                            <div className="list-content">
                            {this.props.post} <span className="time-stamp">Created: {this.props.time}</span>
                            </div>:
                            <div>
                             <input 
                                type="text" 
                                onChange={this.onChangeHandler}/>   
                             <button 
                                className="edit-btn"
                                onClick={this.confirmEditHandler}>Confirm</button>
                            </div>}
                    </div>
                    
                    <div className="list-edit-group">
                        <span className="delete-float" onClick={this.deleteData}>delete</span>
                        <span className="edit-float" onClick={this.editData}>edit</span>
                    </div>
                </li>
            </ul>
        )
    }
}
        


export default ToDo;
