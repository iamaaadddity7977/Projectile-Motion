const g = 9.81; // Acceleration due to gravity (m/s²) Contant 

class ProjectileMotion {
  constructor(mass, angle, force) {
    this.mass = mass;
    this.angle = angle * (Math.PI / 180); // Convert to radians IMP
    this.force = force;
    this.initialVelocity = this.force / this.mass;
  }

  calculateInitialVelocities() {
    return {
      vx: this.initialVelocity * Math.cos(this.angle),
      vy: this.initialVelocity * Math.sin(this.angle)
    };
  }

  calculateMaxHeight() {
    const { vy } = this.calculateInitialVelocities();
    return (vy * vy) / (2 * g);
  }

  calculateTimeOfFlight() {
    const { vy } = this.calculateInitialVelocities();
    return (2 * vy) / g;
  }

  calculateRange() {
    const { vx } = this.calculateInitialVelocities();
    return vx * this.calculateTimeOfFlight();
  }

  getPositionAtTime(t) {
    const { vx, vy } = this.calculateInitialVelocities();
    return {
      x: vx * t,
      y: vy * t - (0.5 * g * t * t)
    };
  }

  getTrajectoryPoints() {
    const points = [];
    const totalTime = this.calculateTimeOfFlight();
    const steps = 100;
    const dt = totalTime / steps;

    for (let t = 0; t <= totalTime; t += dt) {
      points.push(this.getPositionAtTime(t));
    }

    return points;
  }
}