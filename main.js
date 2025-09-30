// Defining DOM elements 
const distanceSlider = document.getElementById("distanceSlider");
let distanceValue = document.getElementById("distanceValue");


//Event listener for a distance slider 
distanceSlider.addEventListener('input', function(){
    const distanceValues = ['Short', 'Medium', 'Long']
    distanceValue.textContent = distanceValues[this.value - 1];
})  