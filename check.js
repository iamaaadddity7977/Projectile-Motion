// Select the input elements and the launch button
const massInput = document.getElementById("mass");
const velocityInput = document.getElementById("velocity");
const angleInput = document.getElementById("angle");
const heightInput = document.getElementById("height");
const launchButton = document.getElementById("launch");

// Function to validate inputs
function validateInputs() {
    const mass = parseFloat(massInput.value);
    const velocity = parseFloat(velocityInput.value);
    const angle = parseFloat(angleInput.value);
    const height = parseFloat(heightInput.value);

    let errors = [];

    // Check each condition and add messages for any errors found
    if (mass <= 0) {
        errors.push("Mass must be greater than 0.");
    }
    if (velocity <= 0) {
        errors.push("Initial Velocity must be greater than 0.");
    }
    if (angle > 90) {
        errors.push("Angle must not be greater than 90 degrees.");
    }
    if (height > 100) {
        errors.push("Initial Height must not be more than 100 meters.");
    }

    // Display errors or proceed with simulation
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    return true;
}

// Event listener for the launch button
launchButton.addEventListener("click", (e) => {
    if (validateInputs()) {
        // If inputs are valid, proceed with the simulation in `script.js`
        import('./script.js').then(module => {
            module.launchSimulation();
        });
    }
});
export function launchSimulation() {
   
    console.log("Simulation launched with valid inputs!");
}
