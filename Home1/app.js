const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {
    //  console.log(`Запрошенный адрес: ${request.url}`);

    //  const filePath = request.url.substring(1);

    //  fs.access(filePath, fs.constants.R_OK, err => {

    //     if (err) {
    //         response.statusCode = 404;
    //         response.end("Resourse not found!");
    //     } else {
    //         fs.createReadStream(filePath).pipe(response);
    //     }
    //  });

    fs.readFile("index.html", function(error, data) {
        
        if (error) {
            response.statusCode = 500;
            response.end("Server error");
        } else {
            const message = "Lern NodeJS";
            const header = "Main";
            const dataaText = data.toString().replace(/{header}/g, header).replace(/{message}/g, message);
            response.end(dataaText);
        }
    })

}).listen(3000, function(){
    console.log("Server started at 3000");
});