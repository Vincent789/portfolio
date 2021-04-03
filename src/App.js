import logo from './logo.svg';
import './App.css';
import Background from './components/three/Background'
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

function App() {

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

  let [state, setState] = useState({
    mainKey: ""
  });



  function useKeyPress(targetKey) {

    // State for keeping track of whether key is pressed
  
    const [keyPressed, setKeyPressed] = useState(false);


  
  
  
    // If pressed key is our target key then set to true
  
    function downHandler({ key }) {
      //console.log("KEY "+key+" TARGETKEY "+targetKey)
      if (key === targetKey) {
        setState(state => {
          return { mainKey: key };
        });   
      }
    }


    
  
  
    // If released key is our target key then set to false
    /*
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setState(state => {
          return { dropKey: key };
        });
      }
  
    };
    */
  
  
    // Add event listeners
  
    useEffect(() => {
  
      window.addEventListener('keydown', downHandler);
  
     //window.addEventListener('keyup', upHandler);
  
      // Remove event listeners on cleanup
  
      return () => {
  
        window.removeEventListener('keydown', downHandler);
  
      // window.removeEventListener('keyup', upHandler);
  
      };
  
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
  
  
    return keyPressed;
  
  }


  return (
      <div 
        className="App"
        >
        <div className="home"
        style={{
          display: displayHome
        }}
        >
          <h1 className="home-title">Vincent<br/>Lhoste</h1>
          <p className="home-text">Front-end (among other things) developper.</p>
          <button onClick={() => setPlaying(true)} className="soundPlayer">Play sound</button>
          <Router>
            <div>
              <nav>
                <ul className="home-menu">
                  <li className="home-menu-item">
                    <Link to="/projets">Projets</Link>
                  </li>
                  <li className="home-menu-item">
                    <Link to="/contact">Contact</Link>
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
        <button
          onClick={() => {
            showTime("block")
            lightsOff("none")
            setCameraRotation(45)
          }
          }
        >
          Play
        </button>
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
          <h3 className="game-control-description">For private Russel Hennessy Barnes, year had been a real shithole. No he had decided to... drive.</h3>
          <div className="game-control-container">
            <a className="level-link">
              Easy
            </a>
          </div>
          <div className="game-control-container">
            <a className="level-link">
              Hard
            </a>
          </div>
          <div className="game-control-container">
            <a className="level-link">
              Insane
            </a>
          </div>
        </div>
        <Background 
        keyPressed={state.mainKey}
        cameraRotation={cameraRotation}
        />
      </div>
  );
}

function About() {
  return <h2 className="fontTester">About</h2>;
}

export default App;

