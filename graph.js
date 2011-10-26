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
	.attr("height", 460)
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
