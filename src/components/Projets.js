import React, {setState, useState, useEffect} from "react";
import Masonry from "react-responsive-masonry"
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  

  function Projets(props) {
    
    //const [isShown, setIsShown] = useState(false);
    const [bgColor, setBgColor] = useState("black");
    const [txtColor, setTxtColor] = useState("white");

    function Close(e) {    
        e.preventDefault();    
        console.log('Le lien a été cliqué.');  
    }

    function setBgRandomColor(){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function lightOrDark(color) {

        // Variables for red, green, blue values
        var r, g, b, hsp;
        
        // Check the format of the color, HEX or RGB?
        if (color.match(/^rgb/)) {
    
            // If RGB --> store the red, green, blue values in separate variables
            color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
            
            r = color[1];
            g = color[2];
            b = color[3];
        } 
        else {
            
            // If hex --> Convert it to RGB: http://gist.github.com/983661
            color = +("0x" + color.slice(1).replace( 
            color.length < 5 && /./g, '$&$&'));
    
            r = color >> 16;
            g = color >> 8 & 255;
            b = color & 255;
        }
        
        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
        );
            
        // Using the HSP value, determine whether the color is light or dark
        if (hsp>127.5) {
            console.log("light")
            return 'white';
        } 
        else {
            console.log("dark")
            return 'black';
        }
    }

    return (
    <div className="projets-container" style={{
        backgroundColor: bgColor,
        color: txtColor,
        transition: "all 2s ease",
        WebkitTransition: "all 2s ease",
        MozTransition: "all 2s ease"
    }}>
        
        <Link to="/" className="closing-cross">X</Link>
        <div className="container">
        <h1 className="page-title">Projets</h1>
        <h3
            style={{
                fontSize: "1em"
            }}
        >{bgColor}</h3>
            <div>
            <Masonry columnsCount={3} gutter="40px">
                {props.posts.map((post, index) => (
                    <div 
                        onMouseEnter={() => {
                             setBgColor(setBgRandomColor);
                             setTxtColor(lightOrDark(bgColor))
                            }
                        }
                        onMouseEnter={() => {
                            setBgColor(setBgRandomColor);
                            setTxtColor(lightOrDark(bgColor))
                           }
                       }
                    >
                        <a 
                            href={post.lien_du_projet} 
                            className="project-link"
                            style={{
                                color: txtColor,
                                transition: "all 2s ease",
                                WebkitTransition: "all 2s ease",
                                MozTransition: "all 2s ease"
                            }}
                            target="_blank"   
                        >
                            <h2 className="project-title">{post.title.rendered}</h2>
                            <p className="project-content" dangerouslySetInnerHTML={{__html: post.content.rendered}}></p>
                            <img className="project-featured-media" src={post.featured_image_url} alt="image_thumbnail"></img>
                        </a>
                    </div>
                ))}
            </Masonry>
            </div>
        </div>
    </div>
    );
}

export default Projets;