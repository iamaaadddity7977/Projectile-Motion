

document.getElementById('angle').addEventListener('input', function () {
    const angleInput = this;
    const angleValue = parseFloat(angleInput.value);

    

    if (angleValue < 0 || angleValue > 90) {
        angleInput.setCustomValidity("Please enter a value between 0 and 90 degrees.");
    } else {
        angleInput.setCustomValidity("");
    }

    angleInput.reportValidity();
});

document.getElementById('mass').addEventListener('input', function () {
    const massInput = this;
    const massValue = parseFloat(massInput.value);

    if (massValue < 0.1) {
        massInput.setCustomValidity("Please enter a mass of at least 0.1 kg.");
    } else {
        massInput.setCustomValidity("");
    }

    massInput.reportValidity();
});


document.getElementById('force').addEventListener('input', function () {
    const forceInput = this;
    const forceValue = parseFloat(forceInput.value);

    if (forceValue < 1) {
        forceInput.setCustomValidity("Please enter a force of at least 1 Newton.");
    } else {
        forceInput.setCustomValidity("");
    }

    forceInput.reportValidity();
});

