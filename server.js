const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config({path:path.join( __dirname,'config/.env')});

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`My Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
})