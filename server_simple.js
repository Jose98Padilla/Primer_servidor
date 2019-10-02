var http=require('http');
var port=3333;
var fs=require('fs');

http.createServer(function(req,res){

  fs.readFile("./index.html",function(err,obj){
      if(err){
        res.writeHead(200,{'Content-type':'aplication/json'});
        res.write(err);
      }else {
        res.writeHead(200,{'Content-type':'text/html'});
        res.write(obj);
        res.end();
      }
});

}
).listen(port);