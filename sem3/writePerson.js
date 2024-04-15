const fs = require('fs');
const path = require('path');

const person = {
    name: "Ivan",
    surname: "Ivanov",
    age: 30,
    city: "Moscow"
};

const personJson = JSON.stringify(person, null, 2);
// fs.writeFileSync('person.json', personJson, 'utf8', (error)=>{
//     if(error){
//         console.error("fail");
//     }else{
//         console.log("win!");
//     }
// });
const pathToFile = path.join(__dirname, "person.json");
console.log(personJson);

fs.writeFileSync(pathToFile, personJson);
