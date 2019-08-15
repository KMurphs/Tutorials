import React from 'react';
import './IrisPrediction.css';


class IrisPrediction extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
    <section class="iris-prediction">
      <div class="iris-prediction__image-container">
        <div className={(this.props.data.species == 'Iris_setosa' ? 'iris-prediction__image--active' : '')}>
          <div style={{backgroundImage: "url('./imgs/Iris_setosa.jpg')"}}></div>
          <div>Iris Setosa</div>
          <div class="mask"></div>
        </div>
        <div className={(this.props.data.species == 'Iris_versicolor' ? 'iris-prediction__image--active' : '')}>
          <div style={{backgroundImage: "url('./imgs/Iris_versicolor.jpg')"}}></div>
          <div>Iris Versicolor</div>
          <div class="mask"></div>
        </div>
        <div className={(this.props.data.species == 'Iris_virginica' ? 'iris-prediction__image--active' : '')}>
          <div style={{backgroundImage: "url('./imgs/Iris_virginica.jpg')"}}></div>
          <div>Iris Virginica</div>
          <div class="mask"></div>
        </div>
      </div>
      <div class="iris-prediction__text-container">
        <div class="iris-prediction__text--faded">Sepal height, Sepal width, Petal height, Petal Width</div>
        <div class="iris-prediction__text--faded">{this.props.data.inputs}</div>
        <div class="iris-prediction__text--faded">Prediction:</div>
        <div class="iris-prediction__text">{this.props.data.species}</div>
      </div>
    </section>
    )
  }
}


export default IrisPrediction;
