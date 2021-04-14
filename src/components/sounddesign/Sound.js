import React from "react";
import {Howl, Howler} from 'howler';

function Sound(props){
    var soundacc; 
    var soundbrk;
    
        var key = props.keyPressed
        function howlsControls() {
            if (props.soundPlaying != false) {
                if (key == "ArrowUp"){
                    console.log("HEYYYYYYY")
                    soundacc = new Howl({
                        src: ['accel.mp3'],
                        volume: 0.2
                    });
                    props.carSound(0.4, true)
                    soundacc.play();
                }
                else if (key == "ArrowDown")
                {   
                    console.log("HEYYYYYYY2")
                    soundbrk = new Howl({
                        src: ['breakrupteur.mp3'],
                        volume: 0.2
                    });
                    props.carSound(0.1, false)
                    soundbrk.play();
                }
            }
        }
        howlsControls()
    

      return (
        <div>
        </div>
      )
}

export default Sound