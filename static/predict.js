// When an image file is selected with the image-selector, trigger the following change
$("#image-selector").change(function(){
    // Create a File Reader Object to allow the web app to read the contents of the selected file
    let reader = new FileReader(); 
    // Set the onload handler for reader which is triggered once the contents of the file is successfully read
    reader.onload = function(){ 
        // Intiailize the dataURL variable to contain the image data as an URL which represents the file's data as base64 encoded string
        let dataURL = reader.result;
        // Set the source attribute of the selected image to the value of dataURL
        $(`#selected-image`).attr("src",dataURL); 
        // Get rid of any previous predictions
        $("#prediction-list").empty(); 
    }
    // Get the image file from the image selector
    let file =  $("#image-selector").prop('files')[0];
    // Load the image by calling readasDataURL on reader
    reader.readAsDataURL(file);
})

let model;
// Immediately Invoked Function Express
(async function(){
    // Load our tensorflow.js file
    model = await tf.loadModel('./model/model.json');
    $('.progress-bar').hide();
})();

// When the user clicks the predict button
$("preduct-button").click(async function(){
    // Get the image from the select image element
    let image = $('#selected-image').get(0);
    // Create a tensor object from the image
    // Resize it to 224X224
    // Cast the type to float32
    // Expand the dimensions to be of rank 4
    let tensor = tf.fromPixeks(image).resizeNearestNeighbor([224,224]).toFloat().expandDims();

    // Pre-processing

    // Calling predict on our model and passing the tensor to it
    // Returns tensor of the output predictions for the given input
    let predictions = await model.predict(tensor).data();
    let top5 = Array.from(predictions).map(function(p,i){
        return {
            probability: p,
            className = IMAGENET_CLASSES[i]
        };
    }).sort(function (a,b){
        return b.probability - a.probability;
    }).slice(0,5);

    $("#prediction-list").empty();
    top5.forEach(function(p){
        $('#prediction-list').append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
    });

});
