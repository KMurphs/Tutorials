import React from 'react';
import './InputSlider.css';


class InputSlider extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value);
  }
  render() {
    return (
    <section className="input-slider">
      <label>
        <span className="input-slider-text">
          <span>{this.props.label ? this.props.label : 'Petal Width' } : </span>
          <input type="number" 
                 name="input-slider-num" 
                 placeholder="0" 
                 value={this.state.value} 
                 onChange={this.handleChange} 
                 min={this.props.min ? this.props.min : 0 } 
                 max={this.props.max ? this.props.max : 100 }  
                 step={this.props.step ? this.props.step : 0.01 } />
        </span>
        <span className="input-slider-range">
          <input type="range" 
                 name="input-slider-num" 
                 placeholder="0" 
                 value={this.state.value} 
                 onChange={this.handleChange} 
                 min={this.props.min ? this.props.min : 0 } 
                 max={this.props.max ? this.props.max : 100 }  
                 step={this.props.step ? this.props.step : 0.01 } />
        </span>
      </label>
    </section>
    )
  }
}


export default InputSlider;
