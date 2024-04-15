const fs = require('fs');

// Создаем объект, который нужно записать в файл.
const obj = {
    name: 'John',
    age: 30,
    city: 'New York'
};

// Сериализуем объект в строку с помощью JSON.stringify.
const serializedObj = JSON.stringify(obj);

// Записываем строку в файл. 
fs.writeFileSync('file.txt', serializedObj, 'utf8', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Файл успешно записан.');
  }
});