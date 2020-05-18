import React, {Component} from 'react';


class ToDo extends Component {
    constructor(props) {
        super(props)
    }
    
    sendData = () => {
        this.props.parentCallback(this.props.id)
    }
    
    
    render() {
        return <li onClick={this.sendData}>{this.props.post}</li> 
    }
}
        


export default ToDo;
