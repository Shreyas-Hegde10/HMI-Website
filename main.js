// Defining DOM elements 
const distanceSlider = document.getElementById("distanceSlider");
let distanceValue = document.getElementById("distanceValue");


//Event listener for a distance slider 
distanceSlider.addEventListener('input', function(){
    const distanceValues = ['Short', 'Medium', 'Long']
    distanceValue.textContent = distanceValues[this.value - 1];
})  

// Traffic light simulation
const lights = document.querySelectorAll('.traffic-light .light');
let current = 0; // 0 = red, 1 = yellow, 2 = green

function changeLight() {
    lights.forEach(l => l.classList.remove('active'));
    lights[current].classList.add('active');

    if (current === 0) {
        // Red → Green after 5s
        setTimeout(() => { current = 2; changeLight(); }, 5000);
    } else if (current === 2) {
        // Green → Yellow after 4s
        setTimeout(() => { current = 1; changeLight(); }, 4000);
    } else if (current === 1) {
        // Yellow → Red after 2s
        setTimeout(() => { current = 0; changeLight(); }, 2000);
    }
}

// Start simulation when page loads
changeLight();