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
