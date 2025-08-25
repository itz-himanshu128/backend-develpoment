import { string } from "mathjs";
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,             //it is for optimizing the searching 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
         
    },
    fullName :{
        type:String,
        required:true,
        trim:true,
        index:true
         
    },
    avatar :{
        type:String, // coludiry url 
        required:true,
        index:true
         
    },
    coverImage :{
        type:String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
    ],
    password:{
        type :String,
        required : [true,'Password is required'],
    },
    refreshToken:{
        type:String
    },
    
},{timestamps:true}
)

userSchema.pre("save", async function(next){

/*
    first methord 

    if(this.isModified(this.password)){
        this.password= bcrypt.hash(this.password,10)        // here we encrypt the password and tell that how many rounds it needs to perform.
    }
*/
    // second methord

    if(!this.isModified("password")) return next();
    
    this.password= await bcrypt.hash(this.password,10)        // here we encrypt the password and tell that how many rounds it needs to perform.
    next()

})          // do not use ()=>{} this call back in this pre hook because it does not have refrence of ".this" because we need to access values from the above schema.



userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
    
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,               // we use this function because "this"  has access to all the data of the database 
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign
    (
        {
            _id:this._id,               // It often needs less data because it refreshes often
       
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

// userSchema.methods.generateRefreshToken=function(){}

export const user = mongoose .model("User",userSchema)