var data = [23, 56, 14, 19, 3, 35];


var x = d3.scale.linear()
	.domain([0, d3.max(data)])
	.range([0, 420]);

var y = d3.scale.ordinal()
	.domain(data)
	.rangeBands([0, 120]);

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
	.attr("y", y)
	.attr("width", x)
	.attr("height", y.rangeBand());

graph.selectAll("text")
	.data(data)
	.enter().append("svg:text")
	.attr("x", x)
	.attr("y", function(d) {return y(d) + y.rangeBand()/2;})
	.attr("dx", 3)
	.attr("dy", ".35em")
	.attr("text-anchor", "start")
	.text(String);

graph.selectAll("line")
	.data(x.ticks(10))
	.enter().append("svg:line")
	.attr("x1", x)
	.attr("x2", x)
	.attr("y1", 0)
	.attr("y2", 120)
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
