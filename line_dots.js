data = [10, 20, 15, 3, 7, 19, 12, 2, 8]
var w = 400,
    h = 200,
margin = 10
y = d3.scale.linear().domain([0,25]).range([0, h]),
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
    .attr("style", "stroke: blueviolet");

var node = g.selectAll("path.dot")
        .data(data)
        .enter().append("svg:path")
        .attr("class", "dot")
        .style("fill", "white")
        .style("stroke-width", "1.5px")
        .attr("stroke", "#9acd32")
        .attr("transform", function(d,i) { return "translate(" + x(i) + "," + y(d) + ")"; })
        .attr("d", d3.svg.symbol())
        .on("mouseover", function(d,i) {
            d3.select(this).transition().duration(300).style("fill","#00ffff"); })
        .on("mouseout", function(d,i) {
            d3.select(this).transition().duration(300).style("fill","white"); });

