// Define SVG area dimensions
var svgWidth = 1000;
var svgHeight = 400;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 40,
  bottom: 70,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#plot")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
console.log('here')
// Load data from hours-of-tv-watched.csv
d3.csv("/static/data/trails_per_state.csv").then(function(tvData) {

  console.log(tvData);

  // Cast the hours value to a number for each piece of tvData
  tvData.forEach(function(d) {
    d.trail_id = +d.trail_id;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(tvData.map(d => d.state_name))
    .range([0, chartWidth])
    // .paddingInner(1)
    .padding(0.5)
    .paddingOuter(.5);

    var bandWidth = xBandScale.bandwidth()
    var range = xBandScale.range()
console.log(range)
console.log(tvData.length)
console.log(bandWidth, tvData.length, tvData.length*bandWidth)

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(tvData, d => d.trail_id)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll(".bar")
    .data(tvData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.state_name))
    .attr("y", d => yLinearScale(d.trail_id))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.trail_id));

}).catch(function(error) {
  console.log(error);
});