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
    
    useEffect(() => {
        // This gets called after every render, by default
        // (the first one, and every one after that)
        console.log('render Contact!');
        if (props.playing == true){
            props.playCarSounds(false, "playing")
        }
        // If you want to implement componentWillUnmount,
        // return a function from here, and React will call
        // it prior to unmounting.
        return () => console.log('unmounting...');
      }, []);

    return (
        <div className="projets-container" style={{
            backgroundColor: bgColor,
            color: txtColor,
        }}>
        
        <Link 
            to="/" 
            className="closing-cross"
            onClick={() => {
                //setGame(false)
                if (props.playing == true){
                    props.playCarSounds(true, "playing")
                }
                else if (props.playing == false){
                    props.playCarSounds(false, "notplaying")
                }
            }}
        >
        X
        </Link>
        <div className="container">
            <h1 className="page-title page-title-contact">Contact</h1>
            <Bobotou btRefresh={props.btRefresh}/>
        </div>
    </div>
    );
}

export default Contact;