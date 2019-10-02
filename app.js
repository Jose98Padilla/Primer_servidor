const http = require("http");
const fs=require("fs");

exports.init=()=>{
    http.createServer((request, response)=>{
      fs.readFile("./index.html",(err, obj)=>{
        if(err){
          response.writeHead(404,{"Content-type":"application/json"});
          response.write(err);

          }else{
            response.writeHead(202, {"Content-type":"text/html"});
            response.write(obj);
            response.end();
          }
      });

    }).listen(4444);

console.log('HOLA MUNDO, CUIDA LOS GATITOS');
};