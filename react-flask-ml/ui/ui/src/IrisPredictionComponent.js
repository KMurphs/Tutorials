import React from 'react';
import './IrisPredictionComponent.css';
import IrisPredictionForm from './IrisPredictionForm';
import IrisPredictionResult from './IrisPredictionResult';


class IrisPredictionComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inputs: [0, 0, 0, 0],
      species: 'Iris_versicolor'
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(values) {
    this.setState({inputs: values})
    // console.log(values.toString().replace(new RegExp(/,/g), ', '))
    // this.setState({value: event.target.value});
  }
  render() {
    return (
    <section className="iris-prediction-component">
      <div>
        <IrisPredictionForm onChange={ this.handleChange }/>
      </div>
      <div>
        <IrisPredictionResult results={{
          'species': this.state.species,
          'inputs': this.state.inputs.toString().replace(new RegExp(/,/g), ', '),
        }}/>
      </div>
    </section>
    )
  }
}


export default IrisPredictionComponent;
