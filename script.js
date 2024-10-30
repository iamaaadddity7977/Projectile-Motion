// Initialize visualizer
const visualizer = new ProjectileVisualizer('trajectory');

// Setup event listeners
document.getElementById('calculate').addEventListener('click', () => {
  const mass = parseFloat(document.getElementById('mass').value);
  const angle = parseFloat(document.getElementById('angle').value);
  const force = parseFloat(document.getElementById('force').value);

  const projectile = new ProjectileMotion(mass, angle, force);

  // Update results
  document.getElementById('initial-velocity').textContent = 
    projectile.initialVelocity.toFixed(2);
  document.getElementById('max-height').textContent = 
    projectile.calculateMaxHeight().toFixed(2);
  document.getElementById('time-of-flight').textContent = 
    projectile.calculateTimeOfFlight().toFixed(2);
  document.getElementById('range').textContent = 
    projectile.calculateRange().toFixed(2);

  // Start animation
  visualizer.animate(projectile);
});