data = [10, 20, 15, 3, 7, 19, 12, 2, 8]
var w = 400,
    h = 200,
margin = 10
y = d3.scale.linear().domain([0,25]).range([h, 0])
x = d3.scale.linear().domain([0,10]).range([margin, w-margin])

// create svg and transform group for line graph
var vis = d3.select("body")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)

var g = vis.append("svg:g")

// create and append the line itself
var line = d3.svg.line()
    .x(function(d,i) { return x(i); })
    .y(function(d) { return y(d); });

g.append("svg:path")
    .attr("d", line(data))

var node = g.selectAll("path.dot")
        .data(data)
	.enter().append("svg:circle")
	.attr("cx", function(d, i) { return x(i) })
	.attr("cy", function(d) { return y(d) })
	.attr("r", 5)
        .style("fill", "white")
        .style("stroke-width", "1.5px")
        .attr("stroke", "#9acd32")
        .attr("d", d3.svg.symbol())
        .on("mouseover", function(d,i) {
            d3.select(this).transition().duration(300).style("fill","lightgreen"); })
        .on("mouseout", function(d,i) {
            d3.select(this).transition().duration(300).style("fill","white").attr("r", 5); })
	.on("click", function(d) {
		d3.select(this).transition().duration(300).attr("r", 20)
	    d3.select("span.graphval").text(d)})

