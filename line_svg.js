// adapted from http://www.janwillemtulp.com/2011/04/01/tutorial-line-chart-in-d3/
// Constants for line graph
var w = 800,
h = 500,
margin = 25,
y = d3.scale.linear().domain([100, 40]).range([0 + margin, h - margin]),
x = d3.scale.linear().domain([0, 8760]).range([0 + margin, w - margin])

// create svg and transform group for line graph
var vis = d3.select("body")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)

var g = vis.append("svg:g")
// skipping this method of moving the origin
// .attr("transform", "translate(0, 200)");


// data is Miami TMY3 outdoor dry bulb
var to = d3.json("To.json", function(json) {
// create and append the line itself
var line = d3.svg.line()
    .x(function(d,i) { return x(i); })
    .y(function(d) { return y(d); });

g.append("svg:path")
    .attr("d", line(json)); })

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

// axis labels, scaled to the months of the year
g.selectAll(".xLabel")
    .data([24*day for each (day in [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365])])
    .enter().append("svg:text")
    .attr("class", "xLabel")
    .text(function(d, i) {return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"][i]; })
    .attr("x", x)
    .attr("y", h-5)
    .attr("text-anchor", "middle")

g.selectAll(".yLabel")
    .data(y.ticks(4))
    .enter().append("svg:text")
    .attr("class", "yLabel")
    .text(String)
    .attr("x", 0)
    .attr("y", y)
    .attr("dy", 4)
