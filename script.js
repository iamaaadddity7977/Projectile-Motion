
// Initialize visualizer
const visualizer = new ProjectileVisualizer('trajectory');

// Default values
const defaultValues = {
  mass: 1,
  angle: 45,
  force: 100
};

// Function to update results
function updateResults(projectile) {
  document.getElementById('initial-velocity').textContent = 
    projectile.initialVelocity.toFixed(2);
  document.getElementById('max-height').textContent = 
    Math.abs(projectile.calculateMaxHeight()).toFixed(2);
  document.getElementById('time-of-flight').textContent = 
    Math.abs(projectile.calculateTimeOfFlight()).toFixed(2);
  document.getElementById('range').textContent = 
    Math.abs(projectile.calculateRange()).toFixed(2);
}

// Function to reset values
function resetValues() {
  document.getElementById('mass').value = defaultValues.mass;
  document.getElementById('angle').value = defaultValues.angle;
  document.getElementById('force').value = defaultValues.force;
  
  const projectile = new ProjectileMotion(
    defaultValues.mass,
    defaultValues.angle,
    defaultValues.force
  );
  
  updateResults(projectile);
  visualizer.animate(projectile);
}

// Setup event listeners
document.getElementById('calculate').addEventListener('click', () => {
  const mass = parseFloat(document.getElementById('mass').value);
  const angle = parseFloat(document.getElementById('angle').value);
  const force = parseFloat(document.getElementById('force').value);

  const projectile = new ProjectileMotion(mass, angle, force);
  updateResults(projectile);
  visualizer.animate(projectile);
});

document.getElementById('reset').addEventListener('click', resetValues);

// Initialize with default values
resetValues();