import dotenv from 'dotenv'
dotenv.config()
import express from  'express'
import cors from 'cors'

import { GoogleGenAI } from "@google/genai";

import connectDb from './db/dbConnect.js';
import Interview from './models/Interview.js';

//Intialsing express app 
const app = express()

app.use(express.json())
app.use(express.urlencoded())

//Intialise genai

const ai  =  new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY})
console.log(process.env.GEMINI_API_KEY)

app.use(cors({
    origin : "*"
}))


app.get("/" , (req , res )=>{
  res.send("hello , server is running ")
})

app.post("/generate-interview", async (req, res) => {
   try {
    console.log('req received ')
     console.log(req.body)
     const {role, level, techstack, type, amount} = req.body
 
     const response = await ai.models.generateContent({
         model: "gemini-2.0-flash", 
         contents: `Prepare questions for a job interview.
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
    
     console.log(typeof response.text);
     const questions = JSON.parse(response.text);
     
     // Store interview data in the database
     const interview = new Interview({
       role,
       level,
       techstack,
       type,
       questions
     });
     
     await interview.save();
     
     // Send back questions array and the interview ID
     res.send({
       questions,
       interviewId: interview._id
     });
   } catch (error) {
        console.log("ERROR : ", error.message);
        res.status(500).send({ error: error.message });
   }
});

// Add endpoint to get all interviews
app.get("/interviews", async (req, res) => {
  try {
    const interviews = await Interview.find().sort({ createdAt: -1 });
    res.send(interviews);
  } catch (error) {
    console.log("ERROR : ", error.message);
    res.status(500).send({ error: error.message });
  }
});

// Add endpoint to get a specific interview by ID
app.get("/interviews/:id", async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).send({ error: "Interview not found" });
    }
    res.send(interview);
  } catch (error) {
    console.log("ERROR : ", error.message);
    res.status(500).send({ error: error.message });
  }
});

//Connected Db to store the interview questions so that if wanted user or some other user 
// can also practice same interview 

connectDb().then(()=>{
  app.listen( process.env.PORT , ()=>{
    console.log(`App is listening on port  : ${process.env.PORT}`)
} )
}).catch((error)=>{
  console.log(`Error in Db connection : ${error.message}`)
})


