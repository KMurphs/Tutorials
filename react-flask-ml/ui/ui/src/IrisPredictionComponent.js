import React from 'react';
import './IrisPredictionComponent.css';
import IrisPredictionForm from './IrisPredictionForm';
import IrisPredictionResult from './IrisPredictionResult';

let histories = []

class IrisPredictionComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      //sepal_length,sepal_width,petal_length,petal_width
      inputs: [0, 0, 0, 0],
      species: 'Iris_versicolor',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDataFile = this.handleDataFile.bind(this);
  }

  componentDidMount(){
    this.timerID = setInterval(()=>{
      // console.log(histories.length)
      // console.log(histories.length)
      if(histories.length !== 0){
        let temp = '';
        histories.forEach((item) => {
          temp = `${temp}\r\n${item}`
        })
        histories = [];
        // console.log(temp.substr(2))
        this.postData('http://localhost:5000/api/predict?format=csv', temp.substr(2))
        .then((res)=>{
          // console.log(res.predictions)
          // console.log(res.predictions[res.predictions.length - 1])
          // console.log(typeof(res.predictions[res.predictions.length - 1].inputs))
          // console.log(typeof(res.predictions[res.predictions.length - 1].inputs.map(item => parseFloat(item))))
          this.setState({
            inputs: res.predictions[res.predictions.length - 1].inputs,
            species: res.predictions[res.predictions.length - 1].prediction.replace(new RegExp(/-/g), '_'),
          })
          let temp = []
          res.predictions.forEach((item) => {
            temp.push({
              sepalLength: item.inputs[0], 
              sepalWidth: item.inputs[1],
              petalLength: item.inputs[2], 
              petalWidth: item.inputs[3], 
              species: item.prediction.replace(new RegExp(/-/g), '_'),
            })
          })
          // console.log(temp)
          this.props.onNewData(temp);
        })
        
      }
    }, 250)
  }

  handleChange(values) {
    this.setState({inputs: values})
    histories.push(values.toString())
    // console.log(values.toString().replace(new RegExp(/,/g), ', '))
    // this.setState({value: event.target.value});
  }
  handleDataFile(fileContent){
    // console.log(fileContent.split('\n'))
    let temp1 = [];
    fileContent.split('\n').forEach((item, index) => {
      const temp = item.replace(new RegExp(/\r/g), '').split(',')
      if(parseFloat(temp[0]))
        temp1.push(temp.splice(0,4).join(',').replace(new RegExp(/ /g), ''))
    })
    // console.log(temp1)
    histories = temp1
  }

  getData(url) {
    return new Promise((resolve) => {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        }
      };
      xhttp.open('GET', url, true);
      xhttp.send();
    });
  }

  postData(url, data) {
    return new Promise((resolve) => {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        }
      };
      xhttp.open('POST', url, true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send(data);
    });
  }


  render() {
    return (
    <section className="iris-prediction-component">
      <div>
        <p>Input Controls</p>
        <IrisPredictionForm onChange={ this.handleChange } onDataFile={ this.handleDataFile }/>
      </div>
      <div>
        <p>Prediction</p>
        <IrisPredictionResult results={{
          'species': this.state.species,
          'inputs': this.state.inputs.map(item => parseFloat(item).toFixed(2)).join(', ')
        }}/>
      </div>
    </section>
    )
  }
}


export default IrisPredictionComponent;
