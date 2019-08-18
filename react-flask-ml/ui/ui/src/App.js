import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MyTimer from './MyTimer';
import IrisPredictionComponent from './IrisPredictionComponent';
import ScatterPlotMatrix from './ScatterPlotMatrix';
// import IrisPredictionResult from './IrisPredictionResult';
// import IrisPredictionForm from './IrisPredictionForm';
// import InputSlider from './InputSlider';

import flowers from './flowers.csv';

const d3 = window.d3;
let fileContent = []

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
      fileData: [],
    }
		d3.csv(flowers, (error, file) => {
			console.log('Read data file')
      fileContent = file
		  // this.state['fileData'] = fileContent.filter((imte, index) => index < 50)
      console.log(this.state.fileData)
		});
  }

  componentDidMount() {
    this.TimerID = setInterval(
      () => this.tick(), 
      3000
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
      fileData: fileContent.filter((imte, index) => index < (50 * (this.state.counter + 1)))
    })
  }

  render() {
    return (<div className="App" style={{backgroundImage: "url('./imgs/iris_background_1.jpg')"}}>
      <main className="App-main-content" >
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <MyTimer />
        <h3>
          Change the input controls and see live prediction of the ML Model.
        </h3>
        
        <div className="ScatterPlotMatrix-container">
          <ScatterPlotMatrix data={this.state.fileData}/>
          {/* <ScatterPlotMatrix data={[{'key': 'temp1'}, {'key': 'temp2'}, {'key': 'temp3'}]}/> */}
        </div>
        <div>
          <IrisPredictionComponent />
        </div>
        {/* <div className="container">
          <IrisPredictionForm/>
        </div>
        <div className="container">
          <IrisPredictionResult results={this.state.data}/>
        </div> */}
        
        {/* <IrisPredictionForm /> */}
        {/* <InputSlider /> */}
        {/* <section id="Time">{this.state.date.toLocaleTimeString()}</section>  */}
        
        {/* <IrisPredictionResult results={this.state.data}/> */}
      </main>
      {/* <div className="overlay"></div> */}
      
    </div>)
  };
}

export default App;
