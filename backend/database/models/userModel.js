
import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,        
    },
    username:{
        type:String,
        required:true,   
       
    },
        
    email:{
        type:String,
       required:true
    },
    password:{
        type:String,
        required:true,
    } ,
    avatar:{
        type:String,
        default:"/images/image.png"
        
    } 

})


export const userModel = mongoose.model('user',userSchema)