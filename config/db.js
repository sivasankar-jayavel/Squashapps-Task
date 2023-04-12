const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser : true,  //to get data's via URL we are this method
        useUnifiedTopology:true   //Its doesn't get old db version so we use this one because am using new mongoDB
    }).then(con=>{
        console.log(`MongoDB is connected to the Host : ${con.connection.host}`)
    }).catch((err)=>{
          console.log(err);
    });
}

module.exports=connectDB;