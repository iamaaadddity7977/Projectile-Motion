const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const g = 9.81; // Acceleration due to gravity (m/s²)
 
let animationId = null;
let trajectory = [];
let currentTime = 0;
let projectile = null;
 
class Projectile {
  constructor(mass, velocity, angle, height) {
    this.mass = mass;
    this.v0 = velocity;
    this.angle = angle * Math.PI / 180; // Convert to radians
    this.h0 = height;
    this.x = 0;
    this.y = height;
    this.vx = velocity * Math.cos(this.angle);
    this.vy = velocity * Math.sin(this.angle);
    this.time = 0;
    this.maxHeight = height;
    this.range = 0;
  }
 
  update(dt) {
    this.time += dt;
    this.x = this.vx * this.time;
    this.y = this.h0 + this.vy * this.time - 0.5 * g * this.time * this.time;
    this.maxHeight = Math.max(this.maxHeight, this.y);
    this.range = this.x;
  }
 
  getFinalVelocity() {
    const vx = this.vx;
    const vy = this.vy - g * this.time;
    return Math.sqrt(vx * vx + vy * vy);
  }
}
 
function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
 
function drawGrid() {
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1;
  
  const gridSize = 50;
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}
 
function drawTrajectory() {
  ctx.strokeStyle = 'rgba(100, 108, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  trajectory.forEach((point, i) => {
    if (i === 0) ctx.moveTo(point.screenX, point.screenY);
    else ctx.lineTo(point.screenX, point.screenY);
  });
  ctx.stroke();
}
 
function drawProjectile(x, y) {
  ctx.fillStyle = '#646cff';
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
  ctx.fill();
}
 
function updateResults() {
  if (!projectile) return;
  
  document.getElementById('time').textContent = projectile.time.toFixed(2) + ' s';
  document.getElementById('max-height').textContent = projectile.maxHeight.toFixed(2) + ' m';
  document.getElementById('range').textContent = projectile.range.toFixed(2) + ' m';
  document.getElementById('final-velocity').textContent = projectile.getFinalVelocity().toFixed(2) + ' m/s';
}
 
function animate() {
  if (!projectile) return;
  
  const dt = 0.016; // 60 FPS
  projectile.update(dt);
  
  // Scale factors for drawing
  const scaleX = canvas.width / (projectile.range + 10);
  const scaleY = canvas.height / (projectile.maxHeight + 10);
  const scale = Math.min(scaleX, scaleY);
  
  const screenX = projectile.x * scale;
  const screenY = canvas.height - projectile.y * scale;
  
  trajectory.push({ screenX, screenY });
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawTrajectory();
  drawProjectile(screenX, screenY);
  
  updateResults();
  
  if (projectile.y <= 0) {
    cancelAnimationFrame(animationId);
    return;
  }
  
  animationId = requestAnimationFrame(animate);
}
 
function launch() {
  const mass = parseFloat(document.getElementById('mass').value);
  const velocity = parseFloat(document.getElementById('velocity').value);
  const angle = parseFloat(document.getElementById('angle').value);
  const height = parseFloat(document.getElementById('height').value);
  
  trajectory = [];
  projectile = new Projectile(mass, velocity, angle, height);
  
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  animate();
}
 
function reset() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  trajectory = [];
  projectile = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  
  document.getElementById('mass').value = '1';
  document.getElementById('velocity').value = '20';
  document.getElementById('angle').value = '45';
  document.getElementById('height').value = '0';
  
  document.getElementById('time').textContent = '0.00 s';
  document.getElementById('max-height').textContent = '0.00 m';
  document.getElementById('range').textContent = '0.00 m';
  document.getElementById('final-velocity').textContent = '0.00 m/s';
}
 
// Event listeners
window.addEventListener('resize', resizeCanvas);
document.getElementById('launch').addEventListener('click', launch);
document.getElementById('reset').addEventListener('click', reset);
 
// Initial setup
resizeCanvas();
drawGrid();
