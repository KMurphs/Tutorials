import React from 'react';
import './ScatterPlotMatrix.css';

const d3 = window.d3; //import the script normally in the html file before the app root element

// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 50, left: 30};
let traits, domainByTrait, x, y, svg, wasSetup, height, width;


class ScatterPlotMatrix extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			species: 'Iris_versicolor',
		}
		//this.handleChange = this.handleChange.bind(this);
	}

	componentDidUpdate(){
		// append the svg object to the body of the page
		if(!svg){
			width = document.getElementById('scatter-plot-matrix').parentElement.clientWidth - margin.left - margin.right
			height = document.getElementById('scatter-plot-matrix').parentElement.clientWidth - margin.top - margin.bottom

			svg = d3.select(this.refs.plotContainer)
					.append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
					.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            wasSetup = false;
		}
		
		if(!wasSetup){
			this.drawData(this.props.data)
			wasSetup =true;
		}
		else
			this.updateDate(this.props.data)
	}



	render() {
    
		return (
			<section className="scatter-plot-matrix" id="scatter-plot-matrix">
				<div className="plot-container" ref="plotContainer">
					{/* {this.props.data.map(item => (<span className="station" key={item.key}>{item.key}</span>))} */}
				</div>
			</section>
		)
	}
	
	
	updateDate(data){
	
		domainByTrait = {}
		traits.forEach(function(trait) {
			domainByTrait[trait] = d3.extent(data, function(d) { return d[trait]; });
		});
		
		svg.selectAll('g.axis').each(function(d, i) { 
			// console.log(this)
			if(i == 0){
				x.domain(domainByTrait['sepalLength'])
				d3.select(this).transition().duration(500).call(d3.axisBottom(x)); 					
			} else if(i == 1){
				y.domain(domainByTrait['sepalWidth'])
				d3.select(this).transition().duration(500).call(d3.axisLeft(y)); 					
			}
		});

		let canvas = svg.select(".content")
		let exisitngCircles = canvas.selectAll("circle").data(data)

		
		exisitngCircles.style("fill", "white")
		exisitngCircles.exit().remove();//remove unneeded circles

		let newCircles = exisitngCircles.enter()
										.append("circle")
											.attr("r",10)
											.style("fill", "red")
											.attr("cx", 0)
											.attr("cy", 0)

		newCircles.merge(exisitngCircles)
						.transition()
						.duration(500)
							.attr("cx", function (d) { return x(d.sepalLength); } )
							.attr("cy", function (d) { return y(d.sepalWidth); } )
							.attr("r", 1.5)
	}

	drawData(data){
		//sepalLength,sepalWidth,petalLength,petalWidth,species
		//console.log(data)
		
		traits = d3.keys(data[0]).filter(function(d) { return d !== "species"; }) //get columns names except for species
		domainByTrait = {}
		traits.forEach(function(trait) {
			domainByTrait[trait] = d3.extent(data, function(d) { return d[trait]; });
		});


		// Add X axis
		x = d3.scaleLinear()
				.domain(domainByTrait['sepalLength'])
				.range([ 0, width ]);
		
		svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));

		// Add Y axis
		y = d3.scaleLinear()
				.domain(domainByTrait['sepalWidth'])
				.range([ height, 0]);
		
		svg.append("g")
				.attr("class", "axis")
				.call(d3.axisLeft(y));

		// Add dots
		svg.append('g')
				.classed('content', true)
				.selectAll("circle")
				.data(data)
				.enter()
					.append("circle")
						.attr("cx", function (d) { return x(d.sepalLength); } )
						.attr("cy", function (d) { return y(d.sepalWidth); } )
						.attr("r", 1.5)
						.style("fill", "red")
	}
}


export default ScatterPlotMatrix;
