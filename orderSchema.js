var mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    order_id : String,
    customer_name : String,
    order_total : String,
    shipping_address : String,
    phone_number : String,
    order_status : String,
    order_date : String, 
});
 module.exports = mongoose.model("order",orderSchema);