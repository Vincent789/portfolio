import React, {setState, useState, useEffect} from "react";
import Masonry from "react-responsive-masonry"
import axios from "axios";
import Bobotou from "./chatbot/Bobotou";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

  

  function Contact(props) {
    
    //const [isShown, setIsShown] = useState(false);
    const [bgColor, setBgColor] = useState("black");
    const [txtColor, setTxtColor] = useState("white");

    return (
        <div className="projets-container" style={{
            backgroundColor: bgColor,
            color: txtColor,
        }}>
        
        <Link to="/" className="closing-cross">X</Link>
        <div className="container">
            <h1 className="page-title">Contact</h1>
            <Bobotou />
        </div>
    </div>
    );
}

export default Contact;