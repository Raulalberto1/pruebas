var http = require('http');
var url = require("url");
var queryString = require("querystring");
var {info,error} = require('./modules/myLogs');
var consts = require('./utils/consts');
var firebase = require('../lib/firebase');
var {countries} = require("countries-list");


var server = http.createServer(function(request,response){

    var parsed = url.parse(request.url);
    console.log("parsed",parsed);
    var pathname = parsed.pathname;
    var query = queryString.parse(parsed.query);
    console.log("query", query);
    //response.writeHead(200,{'Content-Type':'application/json'});
    //response.write(JSON.stringify(countries.MX));
    //response.end();

    if(pathname==="/"){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write('<html><body><p>Home page</p></body></html>');
        response.end();
    }else if(pathname === "/exit"){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write('<html><body><p>bye</p></body></html>');
        response.end();
    }else if(pathname === "/country"){
        //var result = info(pathname); 
        response.writeHead(200,{'Content-Type':'application/json'});
        response.write(JSON.stringify(countries[query.code]));
        response.end();
    }else if(pathname === "/info"){
        var result = info(pathname); //log.info(pathname);
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(result);
        response.end();
    }else if(pathname === "/error"){
        var result = error(pathname); //log.error(pathname);
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(result);
        response.end();
    }else{
        response.writeHead(404,{'Content-Type':'text/html'});
        response.write('<html><body><p>not found</p></body></html>');
        response.end();
    }

    
});

server.listen(4000);
console.log("running on 4000");