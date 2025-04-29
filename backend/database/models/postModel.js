
import mongoose from "mongoose";



const postSchema = new mongoose.Schema({
    
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'        
    },
    title:{
        type:String,
        required:true,   
       
    },
        
    body:{
        type:String,
       required:true
    },
    image:{
        type:String,
    } ,
    likes:{
        type:Number,
        default:0
        
    },
    comments:{
        type:Number,
        default:0
    },
    shares:{
        type:Number,
        default:0
    } ,
    time:{
        type:String,
        default:'Just Now'
    }

},{timestamps:true})


export const postModel = mongoose.model('post',postSchema)