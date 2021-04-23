import React, {setState, useState, useEffect} from "react";
import Masonry from "react-responsive-masonry"
import axios from "axios";
import Bobotou from "./chatbot/Bobotou";
import ReactHowler from 'react-howler'
import { ReactSVG } from 'react-svg'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

  function Contact(props) {
    //const [isShown, setIsShown] = useState(false);
    const [bgColor, setBgColor] = useState("black");
    const [txtColor, setTxtColor] = useState("white");
    const [playingLocal, setPlayingLocal] = useState(false);
    const [playingoffice, setPlayingOffice] = useState(false);

    useEffect(() => {
        // This gets called after every render, by default
        // (the first one, and every one after that)

        console.log('mounting Contact !');
        props.contactOpened(true)
        if (props.playing == true){
            setPlayingOffice(true)
        }
        // If you want to implement componentWillUnmount,
        // return a function from here, and React will call
        // it prior to unmounting.
        return () => console.log('unmounting Contact !');
      }, []);

    return (
        <div className="projets-container" style={{
            backgroundColor: bgColor,
            color: txtColor,
        }}>
            <ReactHowler
                        src='office.mp3'
                        playing={playingoffice}
                        loop={true}
                        volume={0.05}
            />
            <Link 
            to="/" className="closing-cross"
            style={{
                color: "white",
                transition: "all 2s ease",
                WebkitTransition: "all 2s ease",
                MozTransition: "all 2s ease"
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