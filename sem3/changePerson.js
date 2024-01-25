const fs = require('fs');
const path = require('path');

// const person = {
//     name: "Ivan",
//     surname: "Ivanov",
//     age: 30,
//     city: "Moscow"
// };


const pathToFile = path.join(__dirname, "person.json");
// console.log(personJson);

const person = JSON.parse(fs.readFileSync(pathToFile));
person.age -= 10;
person.city = "Lipeck";
const personJson = JSON.stringify(person, null, 2);

fs.writeFileSync(pathToFile, personJson);