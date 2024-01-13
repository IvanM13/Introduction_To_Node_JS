const http = require('http');
let counterMain = 0;
let counterAbout = 0;
let counter404 = 0;

const msgModule = msg =>{
    if([11, 12, 13, 14].includes(msg % 100) || msg % 10 === 1){
        return `Вы вы были здесь ${msg} раз`;
    }else if([2,3,4].includes(msg % 10)){
        return `Вы вы были здесь ${msg} раза`;
    }else {
        return `Вы вы были здесь ${msg} раз`;
    }    
}

const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    if (req.url === '/') {
        counterMain++;
        res.writeHead(200,{
            'Content-type': 'text/html; charset=UTF-8',
        });
        res.end(`<h1>Добро пожаловать на мой сайт!! ${msgModule(counterMain)}</h1>`);
    }else if(req.url === '/about'){
        counterAbout++;
        res.writeHead(200,{
            'Content-type': 'text/html; charset=UTF-8',
        });
        res.end(`<h1>Обо мне:) ${msgModule(counterAbout)}</h1>`);
    }else{
        counter404++;
        res.writeHead(404,{
            'Content-type': 'text/html; charset=UTF-8',
        });
        res.end(`<h1>Страница не найдена!!!404 ${msgModule(counter404)}</h1>`);
    }   
});

const port = 3000;

server.listen(port, () => {
    console.log(`Cервер запущен на порту ${port}`);
});