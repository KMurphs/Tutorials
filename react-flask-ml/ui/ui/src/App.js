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
      predictionData: [],
    }
    this.handleNewData = this.handleNewData.bind(this);
		// d3.csv(flowers, (error, file) => {
		// 	console.log('Read data file')
    //   fileContent = file
    //   console.log(fileContent) //array of {sepalLength: "4.9", sepalWidth: "3.0", petalLength: "1.4", petalWidth: "0.2", species: "setosa"}
		//   // this.state['fileData'] = fileContent.filter((imte, index) => index < 50)
    //   // console.log(this.state.fileData)
		// });
  }

  handleNewData(newData){
    // {sepalLength: "4.9", sepalWidth: "3.0", petalLength: "1.4", petalWidth: "0.2", species: "setosa"}
    // console.log(newData)
    this.setState({ predictionData: this.state.predictionData.concat(newData)})
    // console.log(this.state.predictionData)
  }


  render() {
    return (<div className="App" style={{backgroundImage: "url('./imgs/iris_background_1.jpg')"}}>
      <main className="App-main-content" >
        <MyTimer />
        <h3>
          Change the input controls and see live prediction of the ML Model.
        </h3>
        
        <div className="ScatterPlotMatrix-container">
          <ScatterPlotMatrix data={this.state.predictionData}/>
        </div>
        <div>
          <IrisPredictionComponent onNewData={ this.handleNewData }/>
        </div>
      </main>
    </div>)
  };
}

export default App;
