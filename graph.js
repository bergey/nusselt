var data = [4, 8, 15, 16, 23, 42];

var x = d3.scale.linear()
	.domain([0, d3.max(data)])
	.range(["0px", "420px"]);

var chart = d3.select("body")
	.append("div")
	.attr("class", "chart")
	.selectAll("div")
	.data(data)
	.enter().append("div")
	.style("width", x)
	.text(String);

var barHeight = 20

var graph = d3.select("body")
	.append("svg:svg")
	.attr("class", "chart")
	.attr("width", 460)
	.attr("height", 230)
	.append("svg:g")
	.attr("transform", "rotate(10), translate(0,25)");

graph.selectAll("rect")
	.data(data)
	.enter().append("svg:rect")
	.attr("y", function(d, i) { return i * barHeight; })
	.attr("width", x)
	.attr("height", barHeight);

graph.selectAll("text")
	.data(data)
	.enter().append("svg:text")
	.attr("y", function(d, i) {return (i) * barHeight + 12.5; })
	.attr("x", x)
//	.attr("dx", "-20")
//	.attr("text-anchor", "end")
	.text(String);

graph.selectAll("line")
	.data(x.ticks(10))
	.enter().append("svg:line")
	.attr("x1", x)
	.attr("x2", x)
	.attr("y1", 0)
	.attr("y1", 120)
	.attr("stroke", "#ccc");

graph.selectAll("text.rule")
	.data(x.ticks(10))
		  .enter().append("svg:text")
		  .attr("class", "rule")
		  .attr("x", x)
		  .attr("y", 0)
		  .attr("dy", -3)
		  .attr("text-anchor", "middle")
		  .text(String);

graph.append("svg:line")
	.attr("x1", x(17))
	.attr("x2", x(17))
	.attr("y1", 0)
	.attr("y2", 120)
	.attr("stroke", "#000");

// data is first 10 hours of Miami TMY3 outdoor dry bulb
// cut -f2 for_21.dat |head -n 10|tr '\n' ','; echo
var to = [69.2, 66.3, 66.0, 66.0, 66.5, 66.5, 66.0, 66.3, 69.8]

// copied from http://www.janwillemtulp.com/2011/04/01/tutorial-line-chart-in-d3/  
// Constants for line graph
var w = 400,
h = 200,
margin = 20,
y = d3.scale.linear().domain([60, 70]).range([0 + margin, h - margin]),
x = d3.scale.linear().domain([0, to.length]).range([0 + margin, w - margin])

// create svg and transform group for line graph
var vis = d3.select("body")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)

var g = vis.append("svg:g")
//    .attr("transform", "translate(0, 200)");

// create and append the line itself
var line = d3.svg.line()
    .x(function(d,i) { return x(i); })
    .y(function(d) { return  y(d); })
g.append("svg:path").attr("d", line(to));

// x axis line
g.append("svg:line")
    .attr("x1", margin)
    .attr("y1", h-margin)
    .attr("x2", w)
    .attr("y2",  h-margin)

// y axis line
g.append("svg:line")
    .attr("x1", margin)
    .attr("y1", 0)
    .attr("x2", margin)
    .attr("y2", h-margin)

// axis labels
g.selectAll(".xLabel")
    .data(x.ticks(5))
    .enter().append("svg:text")
    .attr("class", "xLabel")
    .text(String)
    .attr("x", x)
    .attr("y", h)
    .attr("text-anchor", "middle")

g.selectAll(".yLabel")
    .data(y.ticks(4))
    .enter().append("svg:text")
    .attr("class", "yLabel")
    .text(String)
    .attr("x", 0)
    .attr("y", y)
    .attr("dy", 4)
