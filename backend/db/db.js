import mongoose from "mongoose";

const mongoConnection = async ()=>{
    try {
         await mongoose.connect("mongodb+srv://hp14spocox2_db_user:HL4FTgDfOV8Ma2Ij@cluster0.ezsdh6b.mongodb.net/")
          console.log('db connected')
    } catch (error) {
        console.error('db error',error)
    }
}

export default mongoConnection;