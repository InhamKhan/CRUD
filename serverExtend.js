var express = require("express");
var eSession = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var ordSchema = require("./orderSchema");

mongoose.connect("mongodb://0.0.0.0:27017/rawMaterial");
const mongoDb = mongoose.connection;
mongoDb.on("error",console.error.bind(console, 'connection error'));
mongoDb.once("open", function(){
    console.log("successfully connected to DB");
});

function addOrder(request,response){
    console.log("addOrder()....");

        var Order = request.body.order_id;
        var Customer = request.body.customer_name;
        var Total_Order = request.body.order_total;
        var Address = request.body.shipping_address ;
        var Phone = request.body.phone_number;
        var Status = request.body.order_status;
        var Date = request.body.order_date;

    let orderSchema = mongoose.model("order")

    let orderJson ={
            "order_id":Order,
            "customer_name":Customer,
            "order_total":Total_Order,
            "shipping_address":Address,
            "phone_number":Phone,
            "order_status":Status,
            "order_date":Date,
        };
        
        console.log("order ="+JSON.stringify(orderJson));
        var tempOrder = new orderSchema(orderJson);

        try{
            console.log("saving order in DB");
            tempOrder.save();
            console.log("order is saved in DB");
        }catch(error){
            console.error(error);
            response.status(500);
            response.end(error);
        }
          response.setHeader('Content-Type', 'text/html');
          var result = '<hmtl><head><tittle>Thanks For Online Odering for Raw-Metrials</tittle><head><hmtl>';
          response.end(result);
          console.log("addOrder() End");
    }

    async function updateOrder(request,response){
        console.log("updateOrder()......");

        let order = mongoose.model("order");
        var doc_id = request.body.doc_id;
        var customer = request.body.customer_name;
        var total_Order = request.body.order_total;
        var address = request.body.shipping_address;
        var phone = request.body.phone_number;
        var date = request.body.order_date;
        


        let queryString={
            _id: doc_id,
            
        };
        console.log("queryString = "+JSON.stringify(queryString));
        var orderResult;
        try{
            console.log("Query order from DB.");
            orderResult = await order.findOne(queryString);
            orderResult.customer_name = customer;
            orderResult.order_total = total_Order;
            orderResult.shipping_address = address;
            orderResult.phone_number = phone;
            orderResult.order_date = date;
            await orderResult.save();

        }catch(error){
            console.log(error);
            response.status(500);
            response.end(error);
        }
        console.log("updated Order = "+orderResult);
        
        response.setHeader('Content-Type', 'text/html');
        var result = '<hmtl><head><tittle>Your order succesfully updated. Thanks</tittle><head><hmtl>';
        response.end(result);
        console.log("updateOrder() End");
        //response.render('editOrder', { order : orderResult});
    }

    async function getOrderById(request,response){
        console.log("getOrderById()......");

        let order = mongoose.model("order");
        var doc_id = request.query.doc_id;

        let queryString={
            _id: doc_id,
            
        };
        console.log("queryString = "+JSON.stringify(queryString));
        var orderResult;
        try{
            console.log("Query order from DB.");
            orderResult = await order.findOne(queryString);
        }catch(error){
            console.log(error);
            response.status(500);
            response.end(error);
        }
        console.log("orderResult = "+orderResult);
        
        response.render('editOrder', { order : orderResult});
        console.log("getOrderById() End");
    }
    
    async function listOrders(request,response){
        console.log("listOrders().....");
    
        //var Order = request.body.order_id;
        //var Customer = request.body.customer_id;
    
        let order = mongoose.model("order")
    
        
        let queryString={
            order_id: null,
            
        };
    //    console.log("queryString ="+JSON.stringify(queryString));
    
        var rawMaterial;
        try{
            console.log("check the rawMaterial Order");
            rawMaterial = await order.find();
        }catch(error){
            console.log(error);
            response.status(500);
            response.end(error);
        }
        console.log("rawMaterial= "+rawMaterial);
        
        response.render('ordersList', { data : rawMaterial});
        console.log("listOrders() End");
    }

    module.exports = {
                        listOrders, 
                        addOrder,
                        getOrderById,
                        updateOrder
                    }