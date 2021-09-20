
// Fetch the JSON data and console log it
// Load Data from JSON via D3
d3.json("/plot.ly-challenge/samples.json").then(function(data){   
    getData(data);
});

// Populate drop down with subject names, draw Bar and Bubble, show Metadata
// depending on the subject selected
function getData(data){

  console.log(data);
  names = data.names;

  // Populate drop down with names
  let dropdMenu = d3.select("#selDataset");
  names.forEach(name => {
      option = dropdMenu.append("option")
      option.property("value",name)
      option.text(name)
  });
  
  // Show Defaults - Plots and Info
  drawSubjectSamples(names[0], data.samples);
  showSubjectMetadata(names[0], data.metadata);

  // Draw Plots and show Metadata depending on the drop box selection
  d3.select("#selDataset").on("change", optionChanged);

  function optionChanged(){
    subject = dropdMenu.property("value");
    console.log(`subject now is: ${subject}`);

    drawSubjectSamples(subject, data.samples);
    showSubjectMetadata(subject, data.metadata);
  }

}

// Function that Draws Bar and Bubble Chart for Samples of the subject
function drawSubjectSamples(subject, samples){

  sample_values = samples.filter(sample=>sample.id==subject)
                      .map(sample=>sample.sample_values)[0];

  otu_ids = samples.filter(sample=>sample.id==subject)
                      .map(sample=>sample.otu_ids)[0];

  otu_labels = samples.filter(sample=>sample.id==subject)
                          .map(sample=>sample.otu_labels)[0];

  // Define values for bubble chart
  x_valBub = otu_ids;

  y_valBub = sample_values;

  // marker_size = y_values

  text_valBub = otu_labels

  // Define values for bar chart
  x_valBar = sample_values.slice(0,10).reverse();

  y_valBar = otu_ids.slice(0,10).reverse();

  let otu_idsLbl = []

  y_valBar.forEach(y_val => otu_idsLbl.push("OTU " + y_val))

  labels_Bar = otu_labels.slice(0,10).reverse();

  drawBarChart(subject, x_valBar, otu_idsLbl, labels_Bar);
  drawBubbleChart(subject, x_valBub, y_valBub, text_valBub);
}

// Function that draws Bar Chart
function drawBarChart(subject, x, y, text){

  let trace1 = {
    x: x,
    y: y,
    text: text,
    name: subject,
    type: "bar",
    orientation: "h"
  };

  let traceData = [trace1];

  let layout = {
    title: `Result for subject ${subject}`,
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  Plotly.newPlot("bar", traceData, layout);
}

     // Function to draw Bubble Chart
function drawBubbleChart(subject, x, y, text){

  // Draw Plot
  let trace1 = {
    x: x,
    y: y,
    text: text,
    mode: 'markers',
    // name: subject,
    marker: {
      size: y,
      color: x,       
    },
    type: 'scatter' 
  };

  let traceData = [trace1];

  let layout = {
    title: `Bubble Chart with all samples for individual ${subject}`,
    xaxis: {
      title: {
        text: "OTU ID"
      }
    }
    // showlegend: false,
    // height: 600,
    // width: 1200
  };
  Plotly.newPlot('bubble', traceData, layout);
}

function showSubjectMetadata(subject, metadata){
  let metaBox = d3.select("#sample-metadata");

  metaBox.selectAll("p").remove();

  subj_metadata = metadata.filter(mtd=>mtd.id==subject)[0];

  Object.entries(subj_metadata).forEach(([key, value]) => {
      meta_paragraph = metaBox.append("p")
      // meta_paragraph.property("value",s_m)
      meta_paragraph.text(key+": "+value)
  })
};

console.log("Am i first?")


//////////////
// d3.selectAll("li").on("click", function() {
//     // you can select the element just like any other selection
//     var listItem = d3.select(this);
//     listItem.style("color", "blue");
  
//     var listItemText = listItem.text();
//     console.log(listItemText);
//   });
  
