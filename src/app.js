import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
// export  {app}
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit:"16kb"}))       // we did this because we need to control the json response,we don't want to crash the server.

app.use(express.urlencoded({extended:true,limit:"16kb"}))       // when we encode URLs into express it often result in clashes and errors to resolve this we use urlencoder

app.use(express.static("public"))       // it is used because sometimes we want to save some files ( like pdf image etc ) into our server. so it tells that there are some pulic assets that anyone can access.

app.use(cookieParser())// to access secure cookie from user through server. these secure cookies can only be read or remove by server 


// importing routes 
import userRouter from "./routes/user.routes.js";   // we can only take this methord of import when the export statement is 'default' 

// routs decleration
// app.use("/users", userRouter)

// here i wrote useer but in the other file where controle is passed the route is "/register", it is because  if any user hits login then the controle autometiclly goes to registering the user (example: user/register or user/login) anything which holds controle so that file keept clean(it is a standard practice). 
// http://localhost:8000/user/register

app.use("/api/v1/users", userRouter)
// here i used the refrence of the API and version as "v1" to be specific about my 



export { app } 