import React from 'react';
import './ScatterPlotMatrix.css';

const d3 = window.d3; //import the script normally in the html file before the app root element
let width, size, padding, x, y, xAxis, yAxis, color, wasSetup, domainByTrait, svg, cells, traits, n, data;

class ScatterPlotMatrix extends React.Component{

	componentDidUpdate(){
		// append the svg object to the body of the page
		if(!svg){
			this.init();
			this.setupCanvasAndDrawData(this.props.data)
		}
		else
			this.updateDate(this.props.data)
	}

	init(){
		//size for subframe
		width = document.getElementById('scatter-plot-matrix').parentElement.clientWidth
		padding = 20;
		size = (width - 4 * padding) / 4;
		
		wasSetup = false;

		//scales for subframes
		x = d3.scaleLinear().range([padding / 2, size - padding / 2]);
		y = d3.scaleLinear().range([size - padding / 2, padding / 2]);

		//Axis for subframes
		xAxis = d3.axisBottom().scale(x).ticks(6);
		yAxis = d3.axisLeft().scale(y).ticks(6);

		//color scale/scheme
		color = d3.scaleOrdinal(d3.schemeCategory10);

		console.log('d3 Document Initialized')
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
		let thisReactComponent = this;
	
		traits.forEach(function(trait) {
			domainByTrait[trait] = d3.extent(data, function(d) { /*console.log(d);*/ return d[trait]; });
		});
		svg.selectAll(".x.axis").each(function(d) { x.domain(domainByTrait[d]); d3.select(this).call(xAxis);  });
		svg.selectAll(".y.axis").each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis);  });
		svg.selectAll(".cell").each(function(p) { thisReactComponent.plot(this, p, false) });
	}

	setupCanvasAndDrawData(data){

		let thisReactComponent = this;
		//sepalLength,sepalWidth,petalLength,petalWidth,species
		//console.log(data)
		

		domainByTrait = {} //Empty object
		traits = d3.keys(data[0]).filter(function(d) { return d !== "species"; }) //get columns names except for species
		n = traits.length; //get nber of cols

		//Iterate through each col names and get min, max (extent)
		traits.forEach(function(trait) {
			domainByTrait[trait] = d3.extent(data, function(d) { /*console.log(d);*/ return d[trait]; });
		});	
		console.log(`Obtained domain range by data variables: \n ${JSON.stringify(domainByTrait)}\n`)	




		//create huge underlying grid that will span the whole parent frame (all subframes)
		xAxis.tickSize(size * n);
		yAxis.tickSize(-size * n);	

		//create svg container and an orgin point from which to start drawing the remaining
		svg = d3.select(this.refs.plotContainer).append("svg")
										.attr("width", size * n + padding)
										.attr("height", size * n + padding)
									 .append("g")
										.attr("transform", "translate(" + padding + "," + padding / 2 + ")");

		svg.selectAll(".x.axis")
			.data(traits)
			.enter().append("g")
			  .attr("class", "x axis")
			  .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
			  .each(function(d) { 
					x.domain(domainByTrait[d]); 
					d3.select(this).call(xAxis); 
				});

		svg.selectAll(".y.axis")
			.data(traits)
			.enter().append("g")
			  .attr("class", "y axis")
			  .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
			  .each(function(d) { 
					y.domain(domainByTrait[d]); 
				  d3.select(this).call(yAxis); 
				});
		console.log(`Setup canvas and axises for each data trait: \n ${Object.keys(domainByTrait)}\n`)	



		//16 cells not yet drawn with their x and y names and starting positions						
		cells = svg.selectAll(".cell").data(thisReactComponent.cross(traits, traits))  
		let newCells = cells.enter()
							.append("g")
								.attr("class", "cell")
								.attr("transform", function(d) {
									  //positioning at top left of cell to start drawing
									  return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; 
								  })
							//plot everything that needs to be plotted in those cells
							.each(function(p){ thisReactComponent.plot(this, p, true) });
		console.log(`Setup plot frames, also fill the plot with the dataset`)	



		// Titles for the diagonal.
		console.log(cells)
		cells = newCells.merge(cells)
		cells.filter(function(d) { return d.i === d.j; })
		      .append("text") // get the cells where d.i === d.j
			    .attr("x", padding) //position the text
			    .attr("y", padding)
			    .attr("dy", ".71em")
           .style("fill", "#aaa")
			    .text(function(d) { return d.x; }); //write the text (current column trait)
		console.log(`Added titles on the diagonal`)




		//create brush object with event handlers on start, brush and end
		var brush = d3.brush()
					  .on("start", brushstart)
					  .on("brush", brushmove)
					  .on("end", brushend)
					  .extent([[0,0],[size,size]]);
		//bind brush object to cell selection
		cells.call(brush);

		var brushCell;

		// Clear the previously-active brush, if any.
		function brushstart(p) {
			// if the active cell being brushed is not this cell
			if (brushCell !== this) {
				//select a future active cell being brushed and bind brush movement to it
				d3.select(brushCell).call(brush.move, null);
				//bind this virtual active brushcell to this cell
				brushCell = this;
			  
				//m not sure - enforcing domain to be within min and max?
				x.domain(domainByTrait[p.x]);
				y.domain(domainByTrait[p.y]);
			}
		}

		// Highlight the selected circles.
		function brushmove(p) {

			var e = d3.brushSelection(this);
			
			//we are basically oing through the whole dataset (indexed in the abstart world of d3)
			//and givin the circle a class hidden if the callback return false
			svg.selectAll("circle").classed("hidden", function(d) {

			  // if e is truthy (brushing is ucrrently happening?) 
			  // do the complicated thing after the ':'
				return !e
						? false
						: ( // checking whether the point is in the brushing square 
							// the brushing square is e[0][0] e[0][1] e[1][0] e[1][1] 
							   e[0][0] > x(+d[p.x]) 
							|| x(+d[p.x]) > e[1][0]
							|| e[0][1] > y(+d[p.y]) 
							|| y(+d[p.y]) > e[1][1]
						);
			});
		}

		// If the brush is empty, select all circles.
		function brushend() {
			var e = d3.brushSelection(this);

			//no more brushing happening
			if (e === null) 
				//inactive points were given the hidden class, we are removing this class from them
				svg.selectAll(".hidden").classed("hidden", false);
		}
		console.log(`Setup the brushes`)
	}


	//Does the actual plotting
	plot(cellRef, p, doSetup) {
		//current cell
		var cell = d3.select(cellRef);

		//get domain values (min and max for the current x-trait and y-trait relevant to this cell)
		x.domain(domainByTrait[p.x]);
		y.domain(domainByTrait[p.y]);

		if(doSetup)
			this.drawCell(cell)
		
		this.drawData(cell, p)
	}
	
	drawData(aCell, aCellData){
		//plots the points
		let joins = aCell.selectAll("circle").data(this.props.data)

		joins.exit().remove();

		let newJoins = joins.enter()
			                .append("circle")
			                .attr("r", 0)

		newJoins.merge(joins).transition()
							 .duration(500)
							 .attr("cx", function(d) { return x(d[aCellData.x]); })
							 .attr("cy", function(d) { return y(d[aCellData.y]); })
							 .attr("r", 2)
							 .style("fill", function(d) { return color(d.species); });
			
	}
	drawCell(aCell){
		//create cell frame
		aCell.append("rect")
			.attr("class", "frame")
			.attr("x", padding / 2)
			.attr("y", padding / 2)
			.attr("width", size - padding)
			.attr("height", size - padding);	
	}

	//return a matrix as an array of (cell x name and start pos, y name and pos)
	cross(a, b) {
		var c = [],       //will be returned
			n = a.length, //4 - a is cols
			m = b.length, //4 - b is identical to a (sepal width,...)
			i, 
			j;

		for (i = -1; ++i < n;) 
			for (j = -1; ++j < m;) 
				c.push({
					x: a[i], // cell x name (sepal length,...)
					i: i,    // cell x starting position (0 1 2 3) ------ (i = -1; ++i < n;) is the same as (i=0; i<n; i++)
					y: b[j], // cell y name (sepal length,...)
					j: j     // cell y starting position (0 1 2 3) ------ (i = -1; ++i < n;) is the same as (i=0; i<n; i++)
				});
		return c;
	}

}


export default ScatterPlotMatrix;
