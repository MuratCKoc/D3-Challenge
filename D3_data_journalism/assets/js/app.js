// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis= "obesity";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {

  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

    console.log(xLinearScale)
  return xLinearScale;

}

// function used for updating y-scale var upon click on axis lavel
function yScale(data, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d=> d[chosenYAxis]) * 0.8,
        d3.max(data, d => d[chosenYAxis]) * 1.2])
    .range([0, width]);

    return yLinearScale;
}

// rendering X axes
function renderAxesX(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

// rendering y axes
function renderAxesY(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}


// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYscale, chosenYAxis) {

    circlesText.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => newYscale(d[chosenYAxis]));

    return circlesGroup;
}

function renderCirclesText(circlesText, newXScale, chosenXAxis, newYscale, chosenYAxis) {

    circlesText.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]))
    .attr("y", d => newYscale(d[chosenYAxis]));

    return circlesText;
}

function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

    var labelX = function (chosenXAxis) {
                return string.charAt(0).toUpperCase() + string.slice(1);
                } +": ";

    var labelY = function (chosenYAxis) {
                return string.charAt(0).toUpperCase() + string.slice(1);
                } +": ";

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
            return(`${d.state}<br>${labelX}<br>${labelY} ${d[chosenXAxis]}`);
        });
    
        circlesGroup.call(toolTip);
    

}

// Retreive data from the CSV file
d3.csv("assets/data/data.csv").then(function(Data, err) {
    if (err) throw err;
    console.log(Data)

    Data.forEach(function (data){
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });

    // LinearScales
    var xLinearScale = xScale(Data, chosenXAxis);
    var yLinearScale = yScale(Data, chosenYAxis);


    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);


    // append x axis
    var xAxis = chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
});

