//console.log all the sample data along with filling the dropdown button with ids
d3.json("data/samples.json").then(function(data){

    function buttonFill(){

        for (let i=0; i < data.names.length; i++){
            d3.select("#selDataset").append("option").text(data.names[i])
        }

    };
    buttonFill();

})

//function to use within the filter to call the selected ID from the dropdown
function optionChanged(selectedOption) {
    
    //create bar chart from samples array in samples.json

    function barGraph(){
        d3.json("data/samples.json").then(function(data) {
    
            let barArray = data.samples.find(sample => sample.id === selectedOption);

            let xData = barArray.sample_values.slice(0,10).reverse()

            let yData = barArray.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();

            let hoverLabels =  barArray.otu_labels.slice(0, 10).reverse();

            let traceBar = {
                x: xData,
                y: yData,
                type: 'bar',
                orientation: 'h',
                hovertext: hoverLabels
              };
              
              let barData = [traceBar];
              
              let layout = {
                title: "Top Ten OTU ID's and their values"
              };
              
              Plotly.newPlot("bar", barData, layout);
    
    })};

    //create bubble chart from samples array in samples.json

    function bubbleChart(){

        d3.json("data/samples.json").then(function(data) {
    
            let bubbleArray = data.samples.find(sample => sample.id === selectedOption);
            let xData = bubbleArray.otu_ids;
            let yData = bubbleArray.sample_values;
            let markerSize = bubbleArray.sample_values;
            let markerColors = bubbleArray.otu_ids;
            let textValues = bubbleArray.otu_labels;

            let traceBubble = {
                x: xData,
                y: yData,
                text: textValues,
                mode: 'markers',
                marker: {
                  size: markerSize,
                  color: markerColors,
                  colorscale: 'Earth'
                }
            };

        let bubbleData = [traceBubble];

        let layout = {
            title: 'Bubble Chart',
            xaxis: { title: 'OTU IDs' },
            yaxis: { title: 'Sample Values' },
            height: 1000,
            width: 1000
        };

    Plotly.newPlot('bubble', bubbleData, layout);
    })};

    function demographics() {

        d3.json("data/samples.json").then(function(data) {

          let demographicObject = data.metadata.find(meta => meta.id == selectedOption);
          
          let demographicDiv = document.getElementById("sample-metadata");
          demographicDiv.innerHTML = ""; // Clear previous contents of the div
      
          // Iterate over the properties of the demographic object
          for (let property in demographicObject) {
            if (demographicObject.hasOwnProperty(property)) {
              let propertyValue = demographicObject[property];
      
              // Create a paragraph element
              let para = document.createElement("p");
      
              // Create a text node with the property and its value
              let textNode = document.createTextNode(`${property}: ${propertyValue}`);
      
              // Append the text node to the paragraph element
              para.appendChild(textNode);
      
              // Append the paragraph element to the demographic div
              demographicDiv.appendChild(para);
            }
          }
        });
      }

    barGraph("940");
    bubbleChart("940");
    demographics("940");
    return selectedOption

}

optionChanged("940");
