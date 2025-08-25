// we need to add envirronmental variable to this file because as soon as file is loded we want to load our environment variables is avalable to every file 

// require ('dotenv').config({path: './env'})   
// this breaks the consistency of code so that is why there is another process to write it 
import dotenv from "dotenv"

import connectDB from './db/index.js' 
import { app } from './app.js'
// in this second aporach we we write code in any other file then in index file we only import the function and execute.

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000 ,()=>{
        console.log(`Server is running at : ${process.env.PORT }`);
    })
    // may cause error
    app.on("error" ,(error)=>{
            console.log("APP IS NOT ABLE RUN ", error);
            throw error 
        })
    // up to this 
})
.catch((err)=>{
    console.log("MONGO db connection failed ",err)
})


 



















// here we use an aproach where we type all our code in index file and then use it.

/*
import mongoose from "mongoose";
import {DB_NAME}from "./constants";
import express from "express";
const app = express()
( async ()=> {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error" ,(error)=>{
            console.log("APP IS NOT ABLE RUN ", error);
            throw error 
            app.listen(process.env.PORT,()=>{
                console.log(`App is listening on port ${process.env.PORT}`);
            })
        })
    } catch (error) {
        console.error("ERROR: ",error)
        throw err
    }
    
 })()

*/