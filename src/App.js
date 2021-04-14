import './App.css';
import Background from './components/three/Background'
import Score from './components/three/Score'
import Projets from './components/Projets'
import Contact from './components/Contact'
import React,{ useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactHowler from 'react-howler'
import {GiSoundOff} from 'react-icons/gi'
import {GiSoundOn} from 'react-icons/gi'
import { ReactSVG } from 'react-svg'
import Sound from './components/sounddesign/Sound';
import {useTranslation} from "react-i18next";



//import Lottie from 'react-lottie';
//import animationData from './lotties/data.json'
    


function App() {

  /*const lottieOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };*/
  const {t, i18n} = useTranslation('common');
  const [posts, setPosts] = useState([]);
  const [cameraRotation, setCameraRotation] = useState(0);
  console.log("Camera rotation "+cameraRotation)

  useEffect(() => {
        async function loadPosts() {
            const response = await fetch('https://vincentlhoste.fr/vincentlhoste/wp-json/wp/v2/posts');
            if(!response.ok) {
                // oups! something went wrong
                return;
            }
    
            const posts = await response.json();
            setPosts(posts);
        }
    
        loadPosts();
   }, [])

  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');

  const [playing, setPlaying] = useState(false);
  const [displayGame, showTime] = useState("none");
  const [displayHome, lightsOff] = useState("block");

  const [gameAreaVisibility, setVisibility] = useState("hidden");

  const [displayBorder, setBorder] = useState("20px solid white")
  
  const [firstButton, showFirstButton] = useState("block");
  const [soundButtons, playSound] = useState("none");
  const [displayEnter, disableEnter] = useState("block");
  const [getIcon, changeIcon] = useState("soundon.svg");
  const [displayPl, disablePreloader] = useState("block");

  const [accelerating, accelerate] = useState(false);
  const [decelerating, decelerate] = useState(false);
  const [carsound, movesound] = useState(0.1);
  const [basscar, basscarSet] = useState(false);


  const [multiplicatorDivider, setMultiplicatorDivider] = useState(100);

  const [inGame, setGame] = useState(false);
  const [gameLevel, setLevel] = useState("easy");

  let [state, setState] = useState({
    mainKey: "",
    keyDropped: ""
  });

  //acceleration and breaking


  
  const callBackCarsounds = (param1, param2) => {
    movesound(param1)
    setTimeout(function(){ basscarSet(param2) }, 500);
  }
    
  

  const callBackPreloader = () => {
    disablePreloader("none")
  }

  function playingNotPlaying(){
    if (playing == false){
      setPlaying(true)
      changeIcon("soundon.svg")
    }
    else
    {
      setPlaying(false)
      changeIcon("soundoff.svg")
    }
  }


  function useKeyPress(targetKey) {

    // State for keeping track of whether key is pressed
  
    const [keyPressed, setKeyPressed] = useState(false);


  
  
  
    // If pressed key is our target key then set to true
  
    function downHandler({ key }) {
      //console.log("KEY "+key+" TARGETKEY "+targetKey)
      if (key === targetKey) {
        console.log("TargetKey OK")
        setState(state => {
          return { mainKey: key };
        });   
      }
    }

   /*   if (state.mainKey == "ArrowUp"){
        soundacc = new Howl({
          src: ['accel.mp3'],
          volume: 0.2
        });
        movesound(0.4)
        setTimeout(function(){ basscarSet(true) }, 800);
        soundacc.play();
      }
  
      if (state.mainKey == "ArrowDown"){
        soundbrk = new Howl({
          src: ['break.mp3'],
          volume: 0.05
        });
        movesound(0.1)
        basscarSet(false)
        soundbrk.play();
      }*/

    
  

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setState(state => {
          return { keyDropped: key };
        });
      }
    };

  
  
    // Add event listeners
  
    useEffect(() => {
  
      window.addEventListener('keydown', downHandler);
  
      window.addEventListener('keyup', upHandler);
  
      // Remove event listeners on cleanup
  
      return () => {
  
        window.removeEventListener('keydown', downHandler);
      // window.removeEventListener('keyup', upHandler);
  
      };
  
    }, []); // Empty array ensures that effect is only run on mount and unmount
    
    console.log("KeyPressed ?")
    return keyPressed;
  
  }


  return (
      <div 
        className="App"
        >
        <div className="language-controls">
          <button className="language-button" onClick={() => i18n.changeLanguage('en')}>en</button>
          <button className="language-button" onClick={() => i18n.changeLanguage('fr')}>fr</button>
        </div>
        <Sound
        keyPressed={state.mainKey}
        carSound={callBackCarsounds}
        soundPlaying={playing}
        />
        <div className="enterapp"
        style={{
          display: displayEnter
        }}
        >
          <h2 className="loading-text">{t('welcome.title')}<br/></h2>
          <p 
            className="loading-subtext"
            style={{
              display: firstButton
            }}
          >
          {t('welcome.text1')}
          <br/>
          {t('welcome.text2')}
          <br/>
          {t('welcome.text3')}
          <br/>
          </p>
          <p 
            className="loading-subtext"
            style={{
              display: soundButtons
            }}
          >{t('welcome.sound')}<br/></p>
          <button 
          className="enter-button"
          onClick={() => {
            showFirstButton("none")
            playSound("block")
          }}
          style={{
            display: firstButton
          }}
          >
            {t('welcome.enter')}
          </button>
          <div 
            className="isSound"
            style={{
              display: soundButtons
            }}
          >
            <button 
            className="sound-button"
            onClick={() => {
              disableEnter("none")
              changeIcon("soundoff.svg")
            }}
            >
              <ReactSVG src="soundoff.svg" className="sound-loader"/>
            </button>
            <button 
            className="sound-button"
            onClick={() => {
              disableEnter("none")
              changeIcon("soundon.svg")
              setPlaying(true)
            }}
            >
              <ReactSVG src="soundon.svg" className="sound-loader"/>
            </button>
          </div>
          
        </div>
        <div className="preloader"
        style={{
          display: displayPl
        }}
        >
          <p className="loading-text">LOADING<br/></p>
          <p className="loading-subtext">Site will display in a few seconds, please wait.</p>
        </div>
        <div className="home"
        style={{
          display: displayHome
        }}
        >

          <div className="portfolio-container">
              <button 
                onClick={() => {
                  playingNotPlaying()
                }}
                className="soundPlayer"
              >
                <ReactSVG src={getIcon} className="sound-home-site"/>
              </button>
              <h1 className="home-title">{t('home.title')}</h1>
              <div className="story-container">
                <div className="visual-container">
                  <ReactSVG src="rhbarnes.svg" className="rh-barnes-home"/>
                </div>
                <div className="text-container">
                  <p className="home-story">{t('home.story1')}<br/>{t('home.story2')}<br/>{t('home.story3')}<br/><span className="drive">{t('home.story4')}</span></p>
                  <button
                    className="play-button"
                    onClick={() => {
                      showTime("block")
                      lightsOff("none")
                      setCameraRotation(45)
                    }
                    }
                  >
                    {t('home.play')}
                  </button>
                </div>
              </div>
              

              <div className="navigation">
                  
                  <Router>
                    <div className="home-menu-container">
                      <nav>
                        <ul className="home-menu">
                          <li className="home-menu-item">
                            <Link to="/projets">{t('home.menu1')}</Link>
                          </li>
                          <li className="home-menu-item">
                            <Link to="/contact">{t('home.menu2')}</Link>
                          </li>
                        </ul>
                      </nav>

                      {/* A <Switch> looks through its children <Route>s and
                          renders the first one that matches the current URL. */}
                      <Switch>
                        <Route path="/contact">
                          <Contact />
                        </Route>
                        <Route path="/projets">
                          <Projets posts={posts}/>
                        </Route>
                      </Switch>
                    </div>
                  </Router>
                  <ReactHowler
                      src='shadingclub.mp3'
                      playing={playing}
                  />
                  <ReactHowler
                      src='carsound.mp3'
                      playing={playing}
                      loop={true}
                      volume={carsound}
                  />
                  <ReactHowler
                      src='waves.mp3'
                      playing={playing}
                      loop={true}
                      volume={carsound}
                  />
                  <ReactHowler
                      src='basscar.mp3'
                      playing={basscar}
                      loop={true}
                      volume={0.8}
                  />
              </div>
          </div>
        </div>
        <div 
          className="gamecontrols"
          style={{
            display: displayGame
          }}
        >
          <button
            onClick={() => {
              showTime("none")
              lightsOff("block")
            }
          }
          >
            Quit
          </button>
          <h2 className="game-control-title">Level</h2>
          <div className="game-control-container">
            <button 
              className="level-link"
              onClick={() => {
                setGame(true)
                setCameraRotation(55)
                showTime("none")
                setBorder("0px solid white")
                //letsPlay("block")
                setVisibility("visible")
              }}
            >
              Easy
            </button>
          </div>
          <div className="game-control-container">
            <button 
              className="level-link"
              onClick={() => {
                setGame(true)
                setCameraRotation(55)
                showTime("none")
                setBorder(false)
                setVisibility("visible")
                //letsPlay("block")
              }}
            >
              Hard
            </button>
          </div>
          <div className="game-control-container">
            <button 
              className="level-link"
              onClick={() => {
                setGame(true)
                setCameraRotation(55)
                showTime("none")
                setBorder(false)
                setVisibility("visible")
                //letsPlay("block")
              }}
            >
              Insane
            </button>
            <h3 className="game-control-description">{t('game.story1')}<br/>{t('game.story2')}</h3>
          </div>
        </div>
        <Background 
        keyPressed={state.mainKey}
        keyDropped={state.keyDropped}
        cameraRotation={cameraRotation}
        propsOn={callBackPreloader}
        displayBorder={displayBorder}
        />
       <div 
          className="compteur-container"
          style={{
            visibility: gameAreaVisibility,
            height: "0px"
          }}
       >
          <h1 id="compteur" className="home-title">0</h1>
          <h3 className="home-sub-sub">Coins missed</h3>
          <Score multiplicatorDivider={multiplicatorDivider}/>
       </div>
      </div>
  );
}

function About() {
  return <h2 className="fontTester">About</h2>;
}

export default App;

