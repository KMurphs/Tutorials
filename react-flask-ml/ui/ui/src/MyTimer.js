import React from 'react';
import './MyTimer.css';


class MyTimer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
    }
  }
  componentDidMount() {
    this.TimerID = setInterval(
      () => this.tick(), 
      1000
    )
  }
  componentWillUnmount() {
    clearInterval(this.TimerID);
  }
  tick() {
    this.setState({
      date: new Date(),
    })
  }
  render() {
    return (<section id="MyTimer">{this.state.date.toLocaleTimeString()}</section>)
  }
}


export default MyTimer;
