# [Getting Started with d3.js](https://www.freecodecamp.org/news/learn-d3-js-in-5-minutes-c5ec29fb0725/)

## A Beautiful Day

Let's import d3.js with ``<script src='https://d3js.org/d3.v4.min.js'></script>`` in a blank html page. Now in a second script tag
```
d3.select('h3').style('color', 'darkblue');    
d3.select('h3').style('font-size', '24px');
```
> The first parameter dictates **what we want to change** and the second **gives the value**

## Binding

So here, we select the ul and we grasp all the lis inside (might mean that the fact that we are grabbing something that doesn't exist creates it in a virtual space).
At this point we have selected the dom elements.

Now we select the data to bind

Then, the enter does the binding as in a for loop. The result is now a number of empty lis equal to the number of data items in fruits. (it might also be that enter create a forEach loop where each functions below it is called on the array item)

We update the DOM, by appending the created li and inserting a text inside. the input to the function is text is one piece of data each time


```
var fruits = ['apple', 'mango', 'banana', 'orange'];    
d3.select('ul')        
  .selectAll('li')        
  .data(fruits)        
  .enter()        
  .append('li')        
  .text(function(d) { 
    return d; 
  });
```