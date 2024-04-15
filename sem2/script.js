// import calculateResultSum from './calc.js';
const calculateResultSum = require('./calc.js');
require('colors');


const total = calculateResultSum([12.1, 52.2, 73.1], 0.9);

const text = 'Общая стоимость покупок: ' + total.toString().blue + ' рублей'.yellow;

console.log((total > 50) ? text.red : text.green);
