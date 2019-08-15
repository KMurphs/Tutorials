import React from 'react';
import './IrisPredictionForm.css';
import InputSlider from './InputSlider';


class IrisPredictionForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      values: [0,0,0,0]
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(idx, newValue) {
    // this.setState({values: [this.state.values]});
    this.setState(state => {
      // console.log(state)
      const values = state.values.map((item, j) => {
        if (j === idx) {
          return newValue;
        } else {
          return item;
        }
      });
      return {
        values,
      };
    })
    // this.state.values[idx] = newValue;
    // console.log(`${idx} -- ${newValue}`)
    // console.log(this.state.values.toString().replace(new RegExp(/,/g), ', '))
    // console.log(this.state.values.toString())
    this.props.onChange(this.state.values);
  }
  render() {
    return (
    <section className="iris-prediction-form">
      <InputSlider onChange={ (value) => this.handleChange(0, value) } label="Petal Width"/>
      <InputSlider onChange={ (value) => this.handleChange(1, value) } label="Petal Height"/>
      <InputSlider onChange={ (value) => this.handleChange(2, value) } label="Sepal Width"/>
      <InputSlider onChange={ (value) => this.handleChange(3, value) } label="Sepal Height"/>
    </section>
    )
  }
}


export default IrisPredictionForm;
