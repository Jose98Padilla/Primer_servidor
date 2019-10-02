var http=require('http');
var port=3333;
var fs=require('fs');

http.createServer(function(req,res){

let pagina=  fs.readFileSync("./index.html");
        res.writeHead(200,{'Content-type':'text/html'});
        res.write(pagina);
        res.end();
}
).listen(port);