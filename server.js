import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from  "cors";
import PostRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from "dotenv"
// import path from 'path';


const app = express();
dotenv.config()

app.use(bodyParser.json({limit:`30mb`,extended:true}));
app.use(bodyParser.urlencoded({limit:`30mb`,extended:true}));

app.use(cors());
//app.use(cors()) must be above app.use(`/posts`,PostRoutes) 

app.use(`/posts`,PostRoutes)
app.use(`/user`,userRoutes)


// if(process.env.NODE_ENV==="production"){
//     app.use(express.static('mermories_app_mern/build'));
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'mermories_app_mern','build','index.html'))
//     })
// }

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.CONNECTION_URL,)
.then(()=>{app.listen(PORT,()=>{console.log(`Server Runs On Port : ${PORT}`)})})
.catch((err)=>{ console.log(err.message)})   
