var express = require("express");
var eSession = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var path = require('path');
var ejs = require('ejs');
var helper = require('./serverExtend');
const ordSchema = require("./orderSchema");


var myServer =express();
myServer.use(eSession({secret: 'ssshhhh', saveUninitialized:true, resave:true}));
myServer.use(bodyParser.urlencoded({extended:true}));
myServer.use(cors({origin:"*"}));

myServer.set('views', __dirname);
myServer.set('view engine', 'ejs');

myServer.get("/index.htm",function(request,response){
    console.log("recived request for /index.htm");
    response.sendFile(__dirname+"/index.html");
});

myServer.get("/showOrder.htm",function(request,response){
    console.log("recived request for /showOrder.htm");
    response.sendFile(__dirname+"/addOrder.html");
});

myServer.post("/addOrder.htm", helper.addOrder);
myServer.post("/updateOrder.htm", helper.updateOrder);

myServer.get("/editOrder.htm", helper.getOrderById);
myServer.get("/listOrders.htm", helper.listOrders);

 var server = myServer.listen(8080, initFunction);

 function initFunction(){
    var port = server.address().port;
    var host = server.address().address;

    console.log("host =" +host+ ":".port);
 }