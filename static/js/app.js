// Fetch the JSON data and console log it
// Load Data from JSON via D3
d3.json("/plot.ly-challenge/samples.json").then(function(data){   
    getData(data);
});

// Function getData populates drop down with subject names,
// draws Bar and Bubble charts, shows Metadata and Gauge chart
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
  drawGaugeChart(names[0], data.metadata);

  // Specify on change option for dropdown
  d3.select("#selDataset").on("change", optionChanged);

  // Draw Plots and show Metadata depending on the drop box selection
  function optionChanged(){
    subject = dropdMenu.property("value");
    console.log(`subject now is: ${subject}`);

    drawSubjectSamples(subject, data.samples);
    showSubjectMetadata(subject, data.metadata);
    drawGaugeChart(subject, data.metadata);
  }

}

// Function that defines data to draw Bar and Bubble Chart
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

  text_valBub = otu_labels

  // Define values for bar chart
  x_valBar = sample_values.slice(0,10).reverse();

  y_valBar = otu_ids.slice(0,10).reverse();

  let otu_idsLbl = []

  y_valBar.forEach(y_val => otu_idsLbl.push("OTU " + y_val))

  labels_Bar = otu_labels.slice(0,10).reverse();

  // Call draw chart functions with specified data
  drawBarChart(subject, x_valBar, otu_idsLbl, labels_Bar);
  drawBubbleChart(subject, x_valBub, y_valBub, text_valBub);
}

// Function to draw Bar Chart
function drawBarChart(subject, x, y, text){

  let trace1 = {
    x: x,
    y: y,
    text: text,
    name: subject,
    type: "bar",
    orientation: "h",
    marker:{
      color: '#0508b8',
    },
    opacity: 0.6
  };

  let traceData = [trace1];

  let layout = {
    title: `The ${subject} individual`,
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

  let trace1 = {
    x: x,
    y: y,
    text: text,
    mode: 'markers',
    colors: "rgb(110, 173, 138)",
    marker: {
      size: y,
      color: x,  
    },
    type: 'scatter' 
  };

  let traceData = [trace1];

  let layout = {
    xaxis: {
      title: {
        text: "OTU ID"
      }
    }
  };
  Plotly.newPlot('bubble', traceData, layout);
}

// Function to show Metadata
function showSubjectMetadata(subject, metadata){
  let metaBox = d3.select("#sample-metadata");

  metaBox.selectAll("p").remove();

  subj_metadata = metadata.filter(mtd=>mtd.id==subject)[0];

  Object.entries(subj_metadata).forEach(([key, value]) => {
      meta_paragraph = metaBox.append("p")
      meta_paragraph.text(key+": "+value)
  })
};

// Function to draw Gauge Chart
function drawGaugeChart(subject, metadata){
 
  // Get the washing frequence from metadata for subject
  wfreq = metadata.filter(mtd=>mtd.id==subject)[0]["wfreq"];

  console.log(`wfreq: ${wfreq}`)

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1]},
      type: "indicator",
      value: wfreq,
      title: {text: 'Scrubs per Week'},
      mode: "gauge+number",
      gauge: {
        axis: {
          range: [0, 9],
          dtick: 1,
          tickmode: "array",
          tickvals: [0.5,1.5,2.5,3.5,4.5,5.5,6.5,7.5,8.5],  
          ticktext: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
        },
        steps: [
          {range: [0, 1], 'color': 'rgb(247,252,240)'},
          {range: [1, 2], 'color': 'rgb(224,243,219)'},
          {range: [2, 3], 'color': 'rgb(204,235,197)'},
          {range: [3, 4], 'color':  'rgb(168,221,181)'},
          {range: [4, 5], 'color':  'rgb(123,204,196)'},
          {range: [5, 6], 'color':  'rgb(78,179,211)'},
          {range: [6, 7], 'color': 'rgb(43,140,190)'},
          {range: [7, 8], 'color':  'rgb(8,104,172)'},
          {range: [8, 9], 'color':   'rgb(8,64,129)'}],
    },
    }
  ];
  Plotly.newPlot("gauge", data)
}
