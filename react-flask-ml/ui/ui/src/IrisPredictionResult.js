import React from 'react';
import './IrisPredictionResult.css';


class IrisPredictionResult extends React.Component{
  
  render() {
    return (
    <section className="iris-prediction">
      <div className="iris-prediction__text-container">
        <div className="iris-prediction__text--faded">Sepal height, Sepal width, Petal height, Petal Width</div>
        <div className="iris-prediction__text--faded">{this.props.results.inputs}</div>
        <div className="iris-prediction__text--faded">Prediction:</div>
        <div className="iris-prediction__text">{this.props.results.species}</div>
      </div>
      <div className="iris-prediction__image-container">
        <div className="mask"></div>
        <div className={(this.props.results.species === 'Iris_setosa' ? 'iris-prediction__image--active' : '')}>
          <div style={{backgroundImage: "url('./imgs/Iris_setosa.jpg')"}}></div>
          <div>Iris Setosa</div>
        </div>
        <div className={(this.props.results.species === 'Iris_versicolor' ? 'iris-prediction__image--active' : '')}>
          <div style={{backgroundImage: "url('./imgs/Iris_versicolor.jpg')"}}></div>
          <div>Iris Versicolor</div>
        </div>
        <div className={(this.props.results.species === 'Iris_virginica' ? 'iris-prediction__image--active' : '')}>
          <div style={{backgroundImage: "url('./imgs/Iris_virginica.jpg')"}}></div>
          <div>Iris Virginica</div>
        </div>
      </div>
    </section>
    )
  }
}


export default IrisPredictionResult;
