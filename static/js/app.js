
// Fetch the JSON data and console log it

// selectAll("option").text()

let data = []
let subjects = []
let samples = []

function populateDropDown(items){
    // console.log(`check me: `);
    let dropdMenu = d3.select("#selDataset");
    items.forEach(item => {
        option = dropdMenu.append("option")
        option.property("value",item)
        option.text(item)
    });
}

// function isSubjectSample(sample, subject){
//     return sample.id == subject
// }

d3.json("/plot.ly-challenge/samples.json").then(function(load){
    
  data = load;
    console.log(data);

    subjects = data.names;
    samples = data.samples;

    // console.log(subjects)
    // console.log(samples)

    // populate drop down menu with participants IDs
    // console.log(`Before dropdown ${populateDropDown}`)
    populateDropDown(subjects);

    // Split big function getSubjectSample into small ones
    // This one should draw bar chart
    function drawBarChart(subject){
        
      x_values = getSubjectSample(subject).sample_values.slice(0,10).reverse();
      // console.log(x_values)

      y_values = getSubjectSample(subject).otu_ids.slice(0,10).reverse();
      // console.log(y_values)

      let otu_idsLbl = []

      for (i=0;i<y_values.length;i++){
          otu_idsLbl.push("OTU " + y_values[i])
      }
      // console.log(otu_idsLbl)

      labels = getSubjectSample(subject).otu_labels.slice(0,10).reverse();
      // console.log(labels)
        // plot chart
      let trace1 = {
        x: x_values,
        y: otu_idsLbl,
        text: labels,
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
    function drawBubbleChart(subject){

      x_values = getSubjectSample(subject).otu_ids;
      // console.log(x_values)

      y_values = getSubjectSample(subject).sample_values;
      // console.log(y_values)

      // marker_size = y_values

      text_values = getSubjectSample(subject).otu_labels
      // console.log(text_values)

      // Draw Plot
      let trace1 = {
        x: x_values,
        y: y_values,
        text: text_values,
        mode: 'markers',
        // name: subject,
        marker: {
          size: y_values,
          color: x_values,       
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

    // Now this function should return all needed parameters for future charts
    function getSubjectSample(subject){

      let subjectSample = {}

      sample_values = samples.filter(sample=>sample.id==subject)
                      .map(sample=>sample.sample_values)[0];
      // console.log(sample_values)

      otu_ids = samples.filter(sample=>sample.id==subject)
                      .map(sample=>sample.otu_ids)[0];
      // console.log(otu_ids)

      otu_labels = samples.filter(sample=>sample.id==subject)
                          .map(sample=>sample.otu_labels)[0];
      // console.log(otu_labels)

      subjectSample = {
        "sample_values": sample_values,
        "otu_ids": otu_ids,
        "otu_labels": otu_labels
      }

      return subjectSample;

      // sample_values = samples.filter(sample=>sample.id==subject)
      //                 .map(sample=>sample.sample_values)[0]
      //                 .slice(0,10)
      //                 .reverse();

      // otu_ids = samples.filter(sample=>sample.id==subject)
      //                 .map(sample=>sample.otu_ids)[0]
      //                 .slice(0,10)
      //                 .reverse();

      // otu_labels = samples.filter(sample=>sample.id==subject)
      //                     .map(sample=>sample.otu_labels)[0]
      //                     .slice(0,10)
      //                     .reverse();

    }


    drawBarChart(subjects[0])

    drawBubbleChart(subjects[0])










    // Function that loads sample data based on the subject selected
    // function getSubjectSample(subject){

    //   sample_values = samples.filter(sample=>sample.id==subject)
    //                   .map(sample=>sample.sample_values)[0]
    //                   .slice(0,10)
    //                   .reverse();

    //   otu_ids = samples.filter(sample=>sample.id==subject)
    //                   .map(sample=>sample.otu_ids)[0]
    //                   .slice(0,10)
    //                   .reverse();

    //   let otu_idsLbl = []

    //   for (i=0;i<otu_ids.length;i++){
    //       otu_idsLbl.push("OTU " + otu_ids[i])
    //   }

    //   console.log(otu_idsLbl)

    //   otu_labels = samples.filter(sample=>sample.id==subject)
    //                       .map(sample=>sample.otu_labels)[0]
    //                       .slice(0,10)
    //                       .reverse();

    //   console.log(`from function getSubjSample`)
    //   console.log(sample_values)
    //   console.log(otu_idsLbl)

    //   // plot chart
    //   let trace1 = {
    //       x: sample_values,
    //       y: otu_idsLbl,
    //       text: otu_labels,
    //       name: subject,
    //       type: "bar",
    //       orientation: "h"
    //   };

    //   let traceData = [trace1];

    //   let layout = {
    //     title: `Result for subject ${subject}`,
    //     margin: {
    //       l: 100,
    //       r: 100,
    //       t: 100,
    //       b: 100
    //     }
    //   };

    //   Plotly.newPlot("bar", traceData, layout);

    // }

    // getSubjectSample(subjects[0])

});




// let names = samples.map(function(name) {
//     return name.names;
//   });

// console.log(`names ${names}`)

// let subjects = samples.names
// let subjects = Object.values(samples.names);
console.log("Am i first?")


//////////////
// d3.selectAll("li").on("click", function() {
//     // you can select the element just like any other selection
//     var listItem = d3.select(this);
//     listItem.style("color", "blue");
  
//     var listItemText = listItem.text();
//     console.log(listItemText);
//   });
  
