import express from 'express'
import mongoConnection from './db/db.js'
import creditRoutes from './route/creditRoutes.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/reports", creditRoutes)

mongoConnection()


app.listen(process.env.PORT,()=>{
    console.log('running on 5k')
})