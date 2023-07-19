class Plane {
  constructor(registrationNumber, airline, capacity, status) {
    this.registrationNumber = registrationNumber;
    this.airline = airline;
    this.capacity = capacity;
    this.status = status;
    this.assignedGate = null;
  }
}

module.exports = Plane;
