import React, {setState, useState, useEffect} from "react";
import Masonry from "react-responsive-masonry"
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { ReactSVG } from 'react-svg'
import ReactPlayer from 'react-player'
import YouTube from 'react-youtube';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import YouTubePlayer from "react-player/youtube";
  

  function Projets(props) {
    
    const {t} = useTranslation('common');
    //const [isShown, setIsShown] = useState(false);
    const [bgColor, setBgColor] = useState("black");
    const [txtColor, setTxtColor] = useState("white");

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

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

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    }

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [masonryCompressionLevel, setMCL] = useState(3);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
            if (getWindowDimensions().width > 1100){
                setMCL(3)
            }
            else if (getWindowDimensions().width > 700 && getWindowDimensions().width < 1000){
                setMCL(2)
            }
            else if (getWindowDimensions().width < 700){
                setMCL(1)
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    

    function GetContent(props) {    
        //const isVideo = props.isVideo;
        let post = props.post
        let isVideo = post.isvideo
        if (isVideo == "oui") {
        return(

            <Popup trigger={
            
                <div 
                className="project-brick"
                /*onMouseEnter={() => {
                    setBgColor(setBgRandomColor);
                   }
               }*/
               style={{
                color: txtColor,
                transition: "all 2s ease",
                WebkitTransition: "all 2s ease",
                MozTransition: "all 2s ease"
            }}
            >
                    <h2 
                        className="project-title"
                    >
                        {post.title.rendered}
                    </h2>
                    <div 
                        style={{
                            display: t('display1'),
                        }}
                    >
                        <p 
                            className="project-content" 
                            dangerouslySetInnerHTML={{__html: post.content.rendered}}
                        >
                        
                        </p>
                    </div>
                    <div 
                        style={{
                            display: t('display2'),
                        }}
                    >
                        <p 
                            className="project-content" 
                            dangerouslySetInnerHTML={{__html: post.traduction_française}}
                        >
                        
                        </p>
                    </div>
                    <img className="project-featured-media" src={post.featured_image_url} alt="image_thumbnail"></img>     
             </div>
            
            } position="right center"
            >
                <ReactPlayer 
                    width="100%"
                    height="100%"
                    loop={true}
                    playing={true}
                    url={post.lien_du_projet}
                />
            </Popup>

                
        )
        }
        else
        {
        return (
            <div 
                        className="project-brick"
                        /*onMouseEnter={() => {
                            setBgColor(setBgRandomColor);
                           }
                       }*/
                       style={{
                        color: txtColor,
                        transition: "all 2s ease",
                        WebkitTransition: "all 2s ease",
                        MozTransition: "all 2s ease"
                    }}
                    >
                        <a 
                            href={post.lien_du_projet} 
                            className="project-link"
                            target="_blank"
                            style={{
                                color: txtColor
                            }}  
                        >
                            <h2 
                                className="project-title"
                            >
                                {post.title.rendered}
                            </h2>
                            <div 
                                style={{
                                    display: t('display1'),
                                }}
                            >
                                <p 
                                    className="project-content" 
                                    dangerouslySetInnerHTML={{__html: post.content.rendered}}
                                >
                                
                                </p>
                            </div>
                            <div 
                                style={{
                                    display: t('display2'),
                                }}
                            >
                                <p 
                                    className="project-content" 
                                    dangerouslySetInnerHTML={{__html: post.traduction_française}}
                                >
                                
                                </p>
                            </div>
                            <img className="project-featured-media" src={post.featured_image_url} alt="image_thumbnail"></img>
                        </a>
                        
                    </div>
        )
        }
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
        
        <Link 
            to="/" className="closing-cross"
            style={{
                color: txtColor,
                transition: "all 2s ease",
                WebkitTransition: "all 2s ease",
                MozTransition: "all 2s ease"
            }}
        >
           X
        </Link>
        <div className="intelligent-background"></div>
        <div className="container">
        <h1 className="page-title"
            onMouseEnter={() => {
                setBgColor(setBgRandomColor);
            }}
        >{t('projects.title')}
        </h1>
        <h3
            style={{
                fontSize: "1em"
            }}
        >
        {t('projects.colorline')} {bgColor}
        </h3>
            <div>
            <Masonry columnsCount={masonryCompressionLevel} gutter="40px">
                {props.posts.map((post, index) => (
                    <GetContent post={post}
                    style={{
                        transition: "all 2s ease",
                        WebkitTransition: "all 2s ease",
                        MozTransition: "all 2s ease"
                    }}
                    />
                ))}
            </Masonry>
            </div>
        </div>
    </div>
    );
}

export default Projets;