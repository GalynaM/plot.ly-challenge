
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

function isSubjectSample(sample, subject){
    return sample.id == subject
}

d3.json("/plot.ly-challenge/samples.json").then(function(load){
    // samples = [data['metadata'], data["names"], data["samples"]]
    data = load;
    console.log(data);

    subjects = data.names;
    samples = data.samples;

    // convert samples array of objects into array
    // samples = samples1.forEach(index => {
    //     samples1[index]
    // })

    // console.log(subjects)
    console.log(samples)

    // populate drop down menu with participants IDs
    // console.log(`Before dropdown ${populateDropDown}`)
    populateDropDown(subjects);

    // let otu_ids = data.filter(function(val){
    //     return val.samples.id == subjects[0];
    // })

    // check how i can access values inside samples
    // let check = data.samples[0].otu_ids

    // let check = samples.filter(sample=>sample.id == "940")
    // console.log(check);


    function getSubjectSample(subject){

            sample_values = samples.filter(sample=>sample.id==subject)
                            .map(sample=>sample.sample_values)[0]
                            .slice(0,10)
                            .reverse();

            otu_ids = samples.filter(sample=>sample.id==subject)
                            .map(sample=>sample.otu_ids)[0]
                            .slice(0,10)
                            .reverse();

            let otu_idsLbl = []

            for (i=0;i<otu_ids.length;i++){
                otu_idsLbl.push("OTU " + otu_ids[i])
            }

            console.log(otu_idsLbl)

            otu_labels = samples.filter(sample=>sample.id==subject)
                                .map(sample=>sample.otu_labels)[0]
                                .slice(0,10)
                                .reverse();

            // top10values = sample_values[0].filter((value, index)=>index<10)
            // top10ids = otu_ids[0].filter((value, index)=>index<10)
            // top10labels = otu_labels[0].filter((value, index)=>index<10)

            console.log(`from function getSubjSample`)
            console.log(sample_values)
            console.log(otu_idsLbl)

            // plot chart
            let trace1 = {
                x: sample_values,
                y: otu_idsLbl,
                text: otu_labels,
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

    getSubjectSample(subjects[0])

});




// let names = samples.map(function(name) {
//     return name.names;
//   });

// console.log(`names ${names}`)

// let subjects = samples.names
// let subjects = Object.values(samples.names);
console.log("Am i first?")


//////////////
d3.selectAll("li").on("click", function() {
    // you can select the element just like any other selection
    var listItem = d3.select(this);
    listItem.style("color", "blue");
  
    var listItemText = listItem.text();
    console.log(listItemText);
  });
  
