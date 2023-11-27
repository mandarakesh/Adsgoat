import express, { response } from 'express';
import { MongoClient } from 'mongodb';
import axios from 'axios';

const app=express();
const PORT=5001;
const uri='mongodb+srv://adsgoat:adsgoat2023@adsgoat.6uez9.mongodb.net/Adsgoat?retryWrites=true&w=majority';
const client=new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });


let database;

const startServer = async ()=>{
    try{
        app.listen(PORT,()=>{
        console.log("Server is Connected",`${PORT}`)
    })       
    }catch(e){
        console.error("Server is not connected",e)
    }
}
startServer()

app.post('/ads/rakesh',(req,res)=>{
    function generateRandomToken(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
        //   console.log(Math.random()*characters.length)
          token += characters.charAt(randomIndex);
        }
        res.status(200).json(token)
        return token;
      }
      
      // Example: Generate a token with a length of 10
      const randomToken = generateRandomToken(32);
      console.log(randomToken);

});




async function Authentication(req, res, next) {
    try {
    //   const response = await axios.post(`http://localhost:${PORT}/ads/rakesh`);
      const token = "8dIEOgHedjZTqQo15LDbcDBWMLsOUEe8";
      console.log(token);
  
      if (!token) {
        console.log("Token is invalid. Authentication failed.");
        res.status(401).json({ error: "Authentication failed" });
      } else {
        console.log("Token is valid. Authentication successful!");
        req.token = token;
        
        next();
        
      }
    } catch (error) {
      console.error('Error fetching token:', error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }



app.get("/ads/result", Authentication, async (req, res,mail) => {
    console.log("done")
    try {
      await client.connect();
      const database = client.db('Adsgoat').collection('users').find({ email: mail, role: 'user' }).project({ _id: 0, createdAt: 0, updatedAt: 0 }).toArray();
      if(!database){
        console.log("Database is not connected")
      }else{
        const data = await database;
        res.json(data);
        console.log("Fetched Data:",data.length)

        await client.close();
      console.log("db closed")
      }
    } catch (err) {
      res.status(400).json(err);
      console.error("Error", err);
    }
  });
  










  
// async function Authentication(req, res, next) {
//     const user = {
//         id: '123',
//         token: '', // Stored token
//         tokenExpirationDate: new Date() // Initial expiration date
//       };
//     try {
//       const userId = req.user.id;
  
//       // Check if the user has a stored token and its expiration date
//       const storedToken = req.user.token;
//       const tokenExpirationDate = req.user.tokenExpirationDate;
  
//       // If there's no stored token or it has expired, generate a new one
//       if (!storedToken || new Date() > new Date(tokenExpirationDate)) {
//         const newTokenResponse = await axios.post(`http://localhost:${PORT}/ads/rakesh`);
//         const newToken = newTokenResponse.data;
  
//         // Update user information with the new token and its expiration date
//         req.user.token = newToken;
//         req.user.tokenExpirationDate = new Date();
//         req.user.tokenExpirationDate.setMonth(req.user.tokenExpirationDate.getMonth() + 3);
  
//         console.log('New Token:', newToken);
//       }
  
//       // Continue with the authentication process using the stored or newly generated token
//       console.log('Token is valid. Authentication successful!');
//       req.token = req.user.token;
  
//       next();
  
//     } catch (error) {
//       console.error('Error fetching or generating token:', error.message);
//       res.status(500).json({ error: "Internal server error" });
//     }
  
  

// }
