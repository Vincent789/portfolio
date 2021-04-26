import './App.css';
import Background from './components/three/Background'
import Projets from './components/Projets'
import Contact from './components/Contact'
import About from './components/About'
import React,{ useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactHowler from 'react-howler'
import {GiSoundOff, GiStealthBomber} from 'react-icons/gi'
import {GiSoundOn} from 'react-icons/gi'
import { ReactSVG } from 'react-svg'
import Sound from './components/sounddesign/Sound';
import {useTranslation} from "react-i18next";
import { useStore } from './State'
//import Lottie from 'react-lottie';
//import animationData from './lotties/data.json'

var level = 0

function App() {

  /*const lottieOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };*/
  const bears = useStore(state => state.bears)

  function Controls() {
    const increasePopulation = useStore(state => state.increasePopulation)
    return <button onClick={increasePopulation}>one up</button>
  }

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

  //sounds !!
  const [playing, setPlaying] = useState("false")

  const [playingCarsound, setPlayingCarSound] = useState(false);
  const [playingWaves, setPlayingWaves] = useState(false);
  const [playingmain, setPlayingMain] = useState(false);

  const [displayGame, showTime] = useState("none");
  const [displayHome, lightsOff] = useState("block");

  const [gameAreaVisibility, setVisibility] = useState("hidden");

  const [displayBorder, setBorder] = useState("20px solid white")
  
  const [firstButton, showFirstButton] = useState("block");
  const [soundButtons, playSound] = useState("none");
  const [displayEnter, disableEnter] = useState("block");
  const [getIcon, changeIcon] = useState("soundon.svg");
  const [displayPl, disablePreloader] = useState("block");


  const [btRefresh, refreshBt] = useState(false);

  const [accelerating, accelerate] = useState(false);
  const [decelerating, decelerate] = useState(false);
  const [carsound, movesound] = useState(0.1);
  const [basscar, basscarSet] = useState(false);

  const [counterDisplay, displayCounter] = useState("block");
  const [goDisplay, displayGo] = useState("none");

  const [direction, setDirection] = useState("");

  const [colorLang, colorSet] = useState("#ffffff");
  
  const [contact, setContact] = useState(false)

  const [multiplicatorDivider, setMultiplicatorDivider] = useState(100);

  const [inGame, setGame] = useState(false);
  const [gameLevel, setLevel] = useState(0);
  const [endGame, setGameEnd] = useState(false)
  const [gameOver, setGameOver] = useState("Test")
  const [counter, setCounter] = useState(0)
  const [counterEaten, setCounterEaten] = useState(0)

  const [home, setHome] = useState(true)

  let [state, setState] = useState({
    mainKey: "",
    keyDropped: ""
  });

  //setGame en ne passe jamais à true
  //acceleration and breaking

  const callBackEatenCounter = (eaten) => {
    setCounterEaten(eaten)
  }

  const callBackMissedCounter = (missed) => {
    setCounter(missed)
    //console.log(missed)
    if (level == 0){
      if (missed > 9){   
        setGameOver("GAME OVER")
        setGameEnd(true)
        displayCounter("none")
        displayGo("block")
      }
    }
    if (level == 1){
      if (missed > 2){   
        setGameOver("GAME OVER")
        setGameEnd(true)
        displayCounter("none")
        displayGo("block")
      }
    }
    if (level == 2){
      if (missed > 0){   
        setGameOver("GAME OVER")
        setGameEnd(true)
        displayCounter("none")
        displayGo("block")
      }
    }
    /*
    if (missed >4 && gameLevel == 1){
      //console.log(" > 5 !!!")
      setGameOver("GAME OVER")
    }*/
  }
  
  const callBackCarsounds = (param1, param2) => {
    movesound(param1)
    setTimeout(function(){ basscarSet(param2) }, 500);
  }
    
  const callBackColor = (color) => {
    colorSet(color)
  }

  const callBackPreloader = () => {
    disablePreloader("none")
  }

  const callBackContact = (value) => {
    if (playing == true){
        if (value == true){
            setPlayingCarSound(false)
            setPlayingWaves(false)
            basscarSet(false)
        }
        else 
        {
            setPlayingCarSound(true)
            setPlayingWaves(true)
            basscarSet(true)
        }
    }
    else
    {
      setPlayingCarSound(false)
      setPlayingWaves(false)
      basscarSet(false)
    }
  }

  function playingNotPlaying(){
    if (playing == false){
      setPlaying(true)
      setPlayingCarSound(true)
      setPlayingWaves(true)
      setPlayingMain(true)
      basscarSet(true)
      changeIcon("soundon.svg")
    }
    else
    {
      setPlaying(false)
      setPlayingCarSound(false)
      setPlayingWaves(false)
      setPlayingMain(false)
      basscarSet(false)
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
        <div 
          className="language-controls"
          style={{
            display: displayHome
          }}
        >
          <button 
          className="language-button"
          style={{
            color: colorLang,
            borderColor: colorLang,
            border: "1px solid white",
            transition: "all 2s ease",
            WebkitTransition: "all 2s ease",
            MozTransition: "all 2s ease",
          }}
          onClick={() => {
            i18n.changeLanguage('en')
            refreshBt(false)
          }}
          >en</button>
          <button 
          className="language-button" 
          style={{
            color: colorLang,
            borderColor: colorLang,
            border: "1px solid white",
            transition: "all 2s ease",
            WebkitTransition: "all 2s ease",
            MozTransition: "all 2s ease"
          }}
          onClick={() => {
            i18n.changeLanguage('fr')
            refreshBt(true)
          }}
          >
            fr</button>
        </div>
        <Sound
        keyPressed={state.mainKey}
        carSound={callBackCarsounds}
        soundPlaying={playingCarsound}
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
          <button
          className="linkedin-welcome"
          style={{
                display: firstButton
              }}
          >
            <a 
              href="https://www.linkedin.com/in/vincent-lhoste-4a220792/"
              target="_blank"
            >
              <ReactSVG
                src="linkedin.svg"
                className="linkedinSvg"
              />
            </a>
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
              setPlayingMain(true)
              setPlayingCarSound(true)
              setPlayingWaves(true)
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
                          <li className="home-menu-item">
                            <Link to="/apropos">{t('home.menu3')}</Link>
                          </li>
                        </ul>
                      </nav>

                      {/* A <Switch> looks through its children <Route>s and
                          renders the first one that matches the current URL. */}
                      <Switch>
                        <Route path="/apropos">
                          <About/>
                        </Route>
                        <Route path="/contact">
                          <Contact 
                            btRefresh={btRefresh}
                            contactOpened={callBackContact}
                            playing={playing}
                          />
                        </Route>
                        <Route path="/projets">
                          <Projets 
                          posts={posts}
                          changeColor={callBackColor}
                          />
                        </Route>
                      </Switch>
                    </div>
                  </Router>
                  <ReactHowler
                      src='shadingclub.mp3'
                      playing={playingmain}
                      loop={true}
                  />
                  <ReactHowler
                      src='carsound.mp3'
                      playing={playingCarsound}
                      loop={true}
                      volume={carsound}
                  />
                  <ReactHowler
                      src='waves.mp3'
                      playing={playingWaves}
                      loop={true}
                      volume={carsound}
                  />
                  <ReactHowler
                      src='basscar.mp3'
                      playing={basscar}
                      loop={true}
                      volume={carsound}
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
          <h2 className="game-control-title">Level</h2>
          <div className="game-control-container">
            <button
              className="level-link"
              onClick={() => {
                setGame(true)
                setCameraRotation(55)
                showTime("none")
                setBorder("0px solid white")
                setVisibility("visible")
                level = 0
                displayCounter("block")
                setCounter(0)
                setCounterEaten(0)
                setGameEnd(false)
                setHome(false)
              }}
            >
              Difficult
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
                level = 1
                displayCounter("block")
                setCounter(0)
                setCounterEaten(0)
                setGameEnd(false)
                setHome(false)
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
                level = 2
                displayCounter("block")
                setCounter(0)
                setCounterEaten(0)
                setGameEnd(false)
                setHome(false)
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
        coinsCounter={callBackMissedCounter}
        coinsCounterEaten={callBackEatenCounter}
        level={level}
        gameEnd={endGame}
        mobileDirection={direction}
        inGame={inGame}
        counterBack={counter}
        home={home}
        />
       <div 
          className="compteur-container"
          style={{
            visibility: gameAreaVisibility,
            height: "0px"
          }}
       >
          <p id="gains">0</p>
          <p id="compteur">0</p>
          <div
            className="home-sub-sub"
            style = {{
              display: counterDisplay
            }}
          >
          <h6 className="ratio">
            {t('game.missed')} {counter}
          </h6>
          <h6 className="ratio">
            {t('game.eaten')} {counterEaten}
          </h6>
          <table
            className="arrowtable"
          >
            <tbody>
              <tr>
                <td></td>
                <td>
                  <button 
                    className="arrowbutton"
                    onClick={() => {
                      setDirection("up")
                    }}>
                    <ReactSVG src="arrowup.svg" className="arrowsvg arrowup"/>
                  </button>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <button 
                    className="arrowbutton"
                    onClick={() => {
                      setDirection("left")
                    }}>
                    <ReactSVG src="arrowleft.svg" className="arrowsvg arrowleft"/>
                  </button>
                </td>
                <td></td>
                <td>
                  <button 
                    className="arrowbutton"
                    onClick={() => {
                      setDirection("right")
                    }}>
                    <ReactSVG src="arrowright.svg" className="arrowsvg arrowright"/>
                  </button>
            </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button 
                    className="arrowbutton"
                    onClick={() => {
                      setDirection("down")
                    }}>
                    <ReactSVG src="arrowdown.svg" className="arrowsvg arrowdown"/>
                  </button>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          </div>
          <div
            style = {{
              display: goDisplay
            }}>
              <h1 
                className="game-over"
              >{gameOver}</h1>
              <h2 className="yourScore">
                {t('game.yourscore')} {counterEaten}
              </h2>
              <button 
                className="enter-button" 
                onClick={() => {
                  //setGame(true)
                  lightsOff("block")
                  setBorder("20px solid white")
                  displayGo("none")
                  setGameEnd(false)
                  setVisibility("hidden")
                  setHome(true)
                }}>
                {t('game.home')}
              </button>
              <button
                className="enter-button"
                onClick={() => {
                  showTime("block")
                  lightsOff("none")
                  setCameraRotation(45)
                  displayGo("none")
                  displayCounter("block")
                }}>
                {t('game.retry')}
              </button>
              <Router>
                <Link to="/contact">
                  <button className="enter-button">
                    {t('game.contact')}
                  </button>
                </Link>
                <Switch>
                  <Route path="/contact">
                    <Contact 
                      btRefresh={btRefresh}
                      contactOpened={callBackContact}
                      playing={playing}
                    />
                  </Route>
                </Switch>
              </Router>
              
          </div>
       </div>
      </div>
  );
}

export default App;

