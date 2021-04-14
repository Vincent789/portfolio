import React,{ Component } from "react";

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

  export default Score