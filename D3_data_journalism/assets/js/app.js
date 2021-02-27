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
var chosenYAxis= "obesity"

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

//function yScale(date, chosenYAxis )

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


    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);


    // append x axis
    var xAxis = chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
});

