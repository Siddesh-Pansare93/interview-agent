import dotenv from 'dotenv'
dotenv.config()
import express from  'express'
import cors from 'cors'
import Vapi from '@vapi-ai/web';


//Intialsing express app 
const app = express()

app.use(cors({
    origin : "*"
}))



app.post("/chat" , ()=>{
    
} )











app.listen( process.env.PORT , ()=>{
    console.log(`App is listening on port  : ${process.env.PORT}`)
} )

