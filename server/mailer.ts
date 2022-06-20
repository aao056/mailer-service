import nodemailer from "nodemailer";
import http from "http";
import express from 'express';
import cors from 'cors'
import path from 'path'

require('dotenv').config();

const PORT = 8000; 
const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000'
}));
let transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.E_MAIL, 
    pass: process.env.PASSWORD, 
  },
});

app.use(express.static(path.join(__dirname,'public')));

app.get('/' , (req,res) => {
  res.sendFile(path.join(__dirname,'public','index.html'))
})

app.post('/' , async (req,res) => {
  try{
    if(req.body.receiver.length < 5){
      res.status(400).send("Receiver e-mail must have at least 5 characters")
    }
    if(req.body.subject.length < 2){
      res.status(400).send("Subject must have at least 2 characters")
    }
    if(req.body.message.length < 5){
      res.status(400).send("Message must have at least 5 characters")
    }
     await transporter.sendMail({
      from: process.env.E_MAIL, // sender address
      to: req.body.receiver, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
    });
  
    res.status(200).send(`Message sent succesfully.Make sure they check the spam`);

  }catch(err){
    res.status(500).send('Something went wrong..Try again later')
  }


})


async function startServer(){
  http.createServer(app).listen(PORT, () => {
    console.log(`Started service on port ${PORT}`)
  })
}

startServer();