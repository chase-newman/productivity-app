import React from 'react';
import './Header.css'

const Header = (props) => {
    return (
        <nav className="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}}>
            <span className="navbar-brand mb-0 h1">Productivity App</span>
            <span className="navbar-text">
                {props.date}
            </span>
        </nav>
    );
}

export default Header;