import dotenv from 'dotenv'
dotenv.config()
import express from  'express'
import cors from 'cors'
import Vapi from '@vapi-ai/web';
import {GoogleGenAi} from '@google/genai'


//Intialsing express app 
const app = express()

//Intialise genai

const ai  = await new GoogleGenAi(process.env.GEMINI_API_KEY)

app.use(cors({
    origin : "*"
}))



app.post("/generate-interview" ,async (req , res )=>{

    const {role , level , techstack , type , amount } = req.body


    const response  =  await ai.models.generateContent({
        model : "gemini-2.0-flash" , 
        contents : `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `
    })
} )











app.listen( process.env.PORT , ()=>{
    console.log(`App is listening on port  : ${process.env.PORT}`)
} )

