const app = require('./app');

const path=require('path');
const connectDatabase = require('./config/database');



connectDatabase();

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server listen to the port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})





process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled uncaught error`)
    server.close(()=>{
        process.exit(1);
    })
})
