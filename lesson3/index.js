const fs = require('fs');
const os = require('os');
const cpu = os.cpus();
const obj = JSON.stringify(cpu, ["model"], 2);
fs.writeFile('cpu.json', obj, 'utf8', (err) =>{
    if(err){
        console.error(err);
    }
    console.log('The Win!');
});
console.log(obj);


fs.readFile("cpu.json", function(error,data){
    if(error) {  // если возникла ошибка
        return console.log(error);
    }
    console.log(data.toString());   // выводим считанные данные
});
console.log("Асинхронное чтение файлов");