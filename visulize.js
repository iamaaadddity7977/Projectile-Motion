class ProjectileVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.setCanvasSize();
    this.animationId = null;
    this.currentTime = 0;
    this.projectile = null;
    this.scale = 1;
    this.padding = 20;
    window.addEventListener('resize', () => this.setCanvasSize());
  }

  setCanvasSize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }


  calculateScale(points) {
    const maxX = Math.max(...points.map(p => p.x));
    const maxY = Math.max(...points.map(p => p.y));
    const scaleX = (this.canvas.width - this.padding * 2) / maxX;
    const scaleY = (this.canvas.height - this.padding * 2) / maxY;
    this.scale = Math.min(scaleX, scaleY);
  }

  drawAxes() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#94a3b8';
    this.ctx.lineWidth = 1;
    
    // X-axis
    this.ctx.moveTo(this.padding, this.canvas.height - this.padding);
    this.ctx.lineTo(this.canvas.width - this.padding, this.canvas.height - this.padding);
    
    // Y-axis
    this.ctx.moveTo(this.padding, this.canvas.height - this.padding);
    this.ctx.lineTo(this.padding, this.padding);
    
    // Draw arrows
    this.ctx.moveTo(this.canvas.width - this.padding, this.canvas.height - this.padding);
    this.ctx.lineTo(this.canvas.width - this.padding - 10, this.canvas.height - this.padding - 5);
    this.ctx.moveTo(this.canvas.width - this.padding, this.canvas.height - this.padding);
    this.ctx.lineTo(this.canvas.width - this.padding - 10, this.canvas.height - this.padding + 5);
    
    this.ctx.moveTo(this.padding, this.padding);
    this.ctx.lineTo(this.padding - 5, this.padding + 10);
    this.ctx.moveTo(this.padding, this.padding);
    this.ctx.lineTo(this.padding + 5, this.padding + 10);
    
    this.ctx.stroke();
  }

  drawTrajectory(points) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#94a3b8';
    this.ctx.lineWidth = 1;
    points.forEach((point, i) => {
      const x = point.x * this.scale + this.padding;
      const y = this.canvas.height - (point.y * this.scale + this.padding);
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    });
    this.ctx.stroke();
  }

  drawProjectile(x, y) {
    const radius = 8;
    this.ctx.beginPath();
    this.ctx.fillStyle = '#6666FF';
    this.ctx.arc(
      x * this.scale + this.padding,
      this.canvas.height - (y * this.scale + this.padding),
      radius,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  drawVelocityVectors(x, y, vx, vy) {
    const scaledX = x * this.scale + this.padding;
    const scaledY = this.canvas.height - (y * this.scale + this.padding);
    const vectorScale = 20;

    // Draw velocity vectors
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#00BFFF';
    this.ctx.lineWidth = 2;
    
    // Horizontal velocity
    this.ctx.moveTo(scaledX, scaledY);
    this.ctx.lineTo(scaledX + vx * vectorScale, scaledY);
    
    // Vertical velocity
    this.ctx.moveTo(scaledX, scaledY);
    this.ctx.lineTo(scaledX, scaledY - vy * vectorScale);
    
    // Resultant velocity
    this.ctx.moveTo(scaledX, scaledY);
    this.ctx.lineTo(
      scaledX + vx * vectorScale,
      scaledY - vy * vectorScale
    );
    
    this.ctx.stroke();
  }

  animate(projectile) {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.projectile = projectile;
    this.currentTime = 0;
    const totalTime = projectile.calculateTimeOfFlight();
    const points = projectile.getTrajectoryPoints();
    this.calculateScale(points);

    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw background elements
      this.drawAxes();
      this.drawTrajectory(points);

      // Calculate current position and velocities
      const { x, y } = projectile.getPositionAtTime(this.currentTime);
      const { vx, vy } = projectile.calculateInitialVelocities();
      const currentVy = vy - g * this.currentTime;

      // Draw velocity vectors and projectile
      this.drawVelocityVectors(x, y, vx, currentVy);
      this.drawProjectile(x, y);

      if (this.currentTime < totalTime) {
        this.currentTime += totalTime / 100;
        this.animationId = requestAnimationFrame(animate);
      }
    };

    animate();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}