// adapted from http://www.janwillemtulp.com/2011/04/01/tutorial-line-chart-in-d3/
// Constants for line graph
var w = 800,
h = 500,
margin = 25,
y = d3.scale.linear().domain([100, 40]).range([0 + margin, h - margin]),
x = d3.scale.linear().domain([0, 8760]).range([0 + margin, w - margin]), 
tx = function(d) { return "translate(" + x(d) + ",0)"; },
ty = function(d) { return "translate(0," + y(d) + ")"; }

// create svg and transform group for line graph
var vis = d3.select("body")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("pointer-events", "all")

var defs = vis.append("svg:defs");

//add a clipping path to prevent data from graphing outside the axes
defs.append("svg:clipPath")
    .attr("id", "databox")
    .append("svg:rect")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", w - 2*margin)
    .attr("height", h - 2*margin);

var g = vis.append("svg:g")
    .call(d3.behavior.zoom()
        .extent([[0, w], [0, h], [0, 10]])
        .on("zoom", redraw));

function createLine(dataname, datacolor) { return function (json) {
// create and append the line itself
var line = d3.svg.line()
    .x(function(d,i) { return x(i); })
    .y(function(d) { return y(d); });

g.append("svg:path")
    .data([json])
    .attr("d", line)
	.attr("id", dataname)
	.attr("style", "stroke: " + datacolor)
	.attr("clip-path", "url(#databox)"); }}

// data is Miami TMY3 outdoor dry bulb
var to = d3.json("json/z1h100s1rh50v1-To.json", createLine("Miami", "blue"))
//and another, from Indianapolis
var t2 = d3.json("json/z5h100s1rh50v1-To.json", createLine("Indianapolis", "red"))

// x axis line
g.append("svg:line")
    .attr("x1", margin)
    .attr("y1", h-margin)
    .attr("x2", w)
    .attr("y2", h-margin)

// y axis line
g.append("svg:line")
    .attr("x1", margin)
    .attr("y1", 0)
    .attr("x2", margin)
    .attr("y2", h-margin)

redraw();

//changes the color of each datapath based on its dropdown selector
function colorChange(selectObj, dataname) {
	var idx = selectObj.selectedIndex;
	var color = selectObj.options[idx].value;

	d3.select("#" + dataname)
		.attr("style", "stroke: " + color)}

//switches each datapath on or off based on its tickybox
function showHide(tickyBox, dataname) {
	var idx = tickyBox.checked
	if (idx){
		d3.select("#" + dataname)
			.attr("display", "inline");}
	else{
		d3.select("#" + dataname)
			.attr("display", "none");}}

// Taken from mbostock's zoom-pan.html example
// on double-click, redraws the x-axis, y-axis, and all datapaths to the new domain
function redraw() {
  if (d3.event) d3.event.transform(x, y);

  var fx = x.tickFormat(12),
      fy = y.tickFormat(4);

  // Regenerate x-ticks…
  var gx = vis.selectAll("g.xLabel")
      .data(x.ticks(12), String)
      .attr("transform", tx);

  gx.select("text")
      .text(fx);

  var gxe = gx.enter().insert("g")
      .attr("class", "xLabel")
      .attr("transform", tx);

  gxe.append("text")
      .attr("y", h - 5)
      .attr("text-anchor", "middle")
      .text(fx);

  gx.exit().remove();

  // Regenerate y-ticks…
  var gy = vis.selectAll("g.yLabel")
      .data(y.ticks(4), String)
      .attr("transform", ty);

  gy.select("text")
      .text(fy);

  var gye = gy.enter().insert("g")
      .attr("class", "yLabel")
      .attr("transform", ty);

  gye.append("text")
      .attr("x", 0)
      .attr("dy", 4)
      .text(fy);

  gy.exit().remove();

// Redraw all paths
vis.selectAll("path")
    .attr("d", d3.svg.line()
        .x(function(d,i) { return x(i); })
        .y(function(d) { return y(d); }));
}
