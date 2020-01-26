const mongoose = require('mongoose');
const dbPath = "mongodb://localhost:27017/myApp";
mongoose.connect(dbPath,{useNewUrlParser:true});
const db= mongoose.connection;
db.on("error",()=>{
    console.log("Error occured from database");
})
db.once("open", ()=>{
    console.log("Successfully open the database");
})
module.exports = mongoose;