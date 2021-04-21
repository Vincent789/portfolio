import React,{ useState, useEffect } from "react";

var speedFactor = 1;

function Score (props) {
  var multiplicator;

  const [state, setState] = useState({ time: new Date(), score: 0, timeCounter: 0});

  var key = props.keyPressed
  
  useEffect(() => {
    const interval = setInterval(() => {
      tick()
      //scoreBuilder()
    }, 1);
    return () => clearInterval(interval);
  }, []);


  function controls(){
    if (key == "ArrowUp"){
      speedFactor = 100
    }
    else if (key == "ArrowDown"){
      speedFactor = 0.1
      setTimeout(function () {
        speedFactor = 1
      }, 1000);
    }
  }

  controls()
  
  function tick() {
      setState({
        timeCounter: buildScore(state.time),
      });
    //scoreBuilder()
  }


  function buildScore(time){
    let timeCounter = (Math.round(((new Date().getTime())))-time)
    //scoreArray = scoreArray
    return timeCounter
  }

      return (
        <p className="App-clock">
        <div className="score-container">
            <h2>Score</h2>
            <p class="score-text">{state.timeCounter}</p>
            <p class="score-text">{speedFactor}</p>
            <p class="score-text">{state.score}</p>
        </div>
        </p>
      )
}

export default Score

/*
class Score extends Component {
    constructor(props) {
      super(props);
      this.state = {
        time: new Date(),
        timeGoing: 0
        //multiplicatorDivider: 100
      };
    }
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
      this.setState({
        timeGoing: Math.round(((new Date().getTime())-this.state.time)/this.props.multiplicatorDivider)
      });
    }
    render() {
      return (
        <p className="App-clock">
        <div className="score-container">
            <h2>Score</h2>
            <p class="score-text">{this.state.timeGoing}</p>
        </div>
        </p>
      );
    }
  }

  export default Score*/
  

 



/*
class Score extends Component {
    constructor(props) {
      super(props);
      this.state = {
        time: new Date(),
        timeGoing: 0
        //multiplicatorDivider: 100
      };
    }
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
      this.setState({
        timeGoing: Math.round(((new Date().getTime())-this.state.time)/this.props.multiplicatorDivider)
      });
    }
    render() {
      return (
        <p className="App-clock">
        <div className="score-container">
            <h2>Score</h2>
            <p class="score-text">{this.state.timeGoing}</p>
        </div>
        </p>
      );
    }
  }

  export default Score*/