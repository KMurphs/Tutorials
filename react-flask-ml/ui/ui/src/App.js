import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyTimer from './MyTimer';
import IrisPredictionComponent from './IrisPredictionComponent';
// import IrisPredictionResult from './IrisPredictionResult';
// import IrisPredictionForm from './IrisPredictionForm';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      counter: 0,
      species: ['Iris_setosa','Iris_versicolor','Iris_virginica'],
      date: new Date(),
      data: {
        'species': 'Iris_versicolor',
        'inputs': '13.2, 52.4, 26.3, 21.2',
      },
    }
  }

  componentDidMount() {
    this.TimerID = setInterval(
      () => this.tick(), 
      2000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      counter: this.state.counter === 2 ? 0 : this.state.counter + 1,
      date: new Date(),
      data: {
        'species': this.state.species[this.state.counter],
        'inputs': this.state.data['inputs'],
      },
    })
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <IrisPredictionComponent />
        {/* <div className="container">
          <IrisPredictionForm/>
        </div>
        <div className="container">
          <IrisPredictionResult results={this.state.data}/>
        </div> */}
        
        {/* <IrisPredictionForm /> */}
        {/* <InputSlider /> */}
        {/* <section id="Time">{this.state.date.toLocaleTimeString()}</section>  */}
        <MyTimer />
        {/* <IrisPredictionResult results={this.state.data}/> */}
      </header>
      
    </div>)
  };
}

export default App;
