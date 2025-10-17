import mongoose from "mongoose";

const mongoConnection = async ()=>{
    try {
         await mongoose.connect(process.env.MONGO_URI)
          console.log('db connected')
    } catch (error) {
        console.error('db error',error)
    }
}

export default mongoConnection;