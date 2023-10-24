var dataLink = "http://127.0.0.1:5000/data";
var timeLink = "http://127.0.0.1:5000/airports"

origin: http://127.0.0.1:5000/

function init() {
  // Grab a reference to the dropdown select element
  var userSelector = d3.select("#selectUserData");

  // Use the list of sample names to populate the select options
  d3.csv(dataLink).then((data) => {
    
    // Pull all user IDs and then build a unique set to populate the dropdown
    var userIDs = data.map(d => d.user_id);
    var uniqueUsers = new Set(userIDs);

    // populate the dropdown with all the user IDs
    uniqueUsers.forEach((userIDs) => {
      userSelector
      .append("option")
      .text(userIDs)
      .property("value", userIDs);
    });

    // Use the first sample from the list to build the initial plots
    var firstUser = userIDs[0];

    buildUserChart(firstUser);
  });

//   // Grab a reference to the dropdown select element
//   var airportSelector = d3.select("#selectAirportData");

//   d3.csv(dataLink).then((data) => {
    
//     // Pull in all itinerary airport codes and make a unique set for the dropdown
//     var airportIDs = data.map(d => d.depart_airport +"-"+ d.return_airport);
//     var uniqueAirports = new Set(airportIDs);
    
//     // Populate the dropdown with all airport IDs
//     uniqueAirports.forEach((airportIDs) => {
//       airportSelector
//       .append("option")
//       .text(airportIDs)
//       .property("value", airportIDs);
//     });

//     // Use the first sample from the list to build the initial plots
//     var firstAirport = airportIDs[0];
    
//     buildTimeChart(firstAirport);
//   });
}

// Initialize the dashboard
init();
  
function optionOneChanged(currentUser) {
  // Fetch new data each time a new sample is selected
  buildUserChart(currentUser);
}

// function optionTwoChanged(currentUser) {
//   // Fetch new data each time a new sample is selected
//   buildTimeChart(currentUser);
// }

function buildUserChart(currentUser) {
  
  d3.csv(dataLink).then((data) => {
    // Get the user IDs for the plot title
    var userIDs = data.map(d => d.user_id);
    // Pull in the timestamps for when the data were collected
    var collectionTime = data.map(d => d.time_stamp);
    // Pull in the total cost so that it may be plotted versus the timestamp
    var totalCost = data.map(d => d.total_cost);

    // Set the trace data
    var lineData = [{
      x: collectionTime,
      y: totalCost,
      text: userIDs,
      type: "line",
    }];
    
    var lineLayout = {
      title: String(userIDs[0]),
      yaxis: {
        range: [0,Math.max(totalCost)+25]
      }
    };

    Plotly.newPlot("plotArea1",lineData,lineLayout)
  });
}

// function buildTimeChart(newUserAirports) {
  
//   d3.csv(timeLink+"/"+newUserAirports).then((data) => {
//     // 3. Create a variable that holds the samples array. 
//     var daysBeforePurchase = data.map(d => d.days_before_purchase);
//     // var userIDs = data.map(d => d.user_id);
//     var airportIDs = data.map(d => d.depart_airport +"-"+ d.return_airport);
//     // var collectionTime = data.map(d => d.time_stamp);
//     var totalCost = data.map(d => d.total_cost);
//     // console.log(totalCost);
    
//     // Set the chart type and data to be utilized
//     var scatterData = [{
//       x: daysBeforePurchase,
//       y: totalCost,
//       text: airportIDs,
//       mode: 'markers',
//       type: "scatter",
//     }];

//     // Create the layout for the bar chart. 
//     var barLayout = {
//       title: String(airportIDs[0]),
//       yaxis: {
//           range: [0,Math.max(totalCost)+25]
//       }
//     };

//     // Use Plotly to plot the data with the layout. 
//     Plotly.newPlot("plotArea2",scatterData,barLayout)
//   });
// }