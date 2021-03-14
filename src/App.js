import logo from './logo.svg';
import './App.css';
import Background from './components/three/Background'
import React,{ useEffect, useState } from "react";



function App() {
  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');

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
  
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setState(state => {
          return { dropKey: key };
        });
      }
  
    };
  
  
  
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

        <Background keyPressed={state.mainKey}/>
      </div>
  );
}



export default App;

