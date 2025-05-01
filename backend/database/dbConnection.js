import mongoose from "mongoose"



export const connection = ()=>{
    mongoose.connect(process.env.DB_URI)
    .then(()=>console.log("db connected"))
    .catch((err)=>console.log(err))
}