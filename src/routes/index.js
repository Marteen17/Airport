const express = require('express');
const router = express.Router();
const Plane = require('../models/plane');
const Gate = require('../models/gate');

let planes = [
  new Plane('AA735', 'AMERICAN AIRLINES', 200, 'Disponible'),
  new Plane('SP635', 'SPIRIT', 150, 'En vuelo'),
  new Plane('AM265', 'AEROMEXICO', 180, 'En mantenimiento')
];

let gates = [
  new Gate(1, 'Disponible', null),
  new Gate(2, 'Ocupado', planes[0]),
  new Gate(3, 'Disponible', null)
];

router.get('/', (req, res) => {
  res.render('index', { planes, gates });
});

router.get('/planes/add', (req, res) => {
  res.render('add-plane');
});

router.post('/planes', (req, res) => {
  const { registrationNumber, airline, capacity, status } = req.body;
  const newPlane = new Plane(registrationNumber, airline, capacity, status);
  planes.push(newPlane);
  res.redirect('/');
});

router.get('/planes/edit/:registrationNumber', (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  const plane = planes.find(plane => plane.registrationNumber === registrationNumber);
  res.render('edit-plane', { plane });
});

router.post('/planes/edit/:registrationNumber', (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  const { airline, capacity, status } = req.body;
  const plane = planes.find(plane => plane.registrationNumber === registrationNumber);
  plane.airline = airline;
  plane.capacity = capacity;
  plane.status = status;
  res.redirect('/');
});

router.post('/planes/delete/:registrationNumber', (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  planes = planes.filter(plane => plane.registrationNumber !== registrationNumber);
  res.redirect('/');
});

router.get('/gates/add', (req, res) => {
  res.render('add-gate');
});

router.post('/gates', (req, res) => {
  const { number, status } = req.body;
  const newGate = new Gate(number, status, null);
  gates.push(newGate);
  res.redirect('/');
});

router.post('/gates/assign/:registrationNumber', (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  const gateNumber = parseInt(req.body.gateNumber);

  const plane = planes.find(plane => plane.registrationNumber === registrationNumber);
  const gate = gates.find(gate => gate.number === gateNumber);

  if (plane && gate && gate.status === 'Disponible') {
    plane.gate = gateNumber; 
    gate.status = 'Ocupado';
  }

  res.redirect('/');
});

router.post('/gates/unassign/:registrationNumber', (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  const plane = planes.find(plane => plane.registrationNumber === registrationNumber);

  if (plane && plane.gate) { 
    const gate = gates.find(gate => gate.number === plane.gate);
    if (gate) {
      gate.status = 'Disponible';
      plane.gate = null; 
    }
  }

  res.redirect('/');
});

module.exports = router;
