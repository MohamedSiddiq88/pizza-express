import express from "express"
import { addRandomString, addUsers, generateJwtToken, getRandom, getUser } from "../Controllers/users.js";
import bcrypt from "bcrypt"
import crypto from "crypto"
import nodemailer from "nodemailer";


const router=express.Router();

router.post("/signup",async(req,res)=>{
    try {
        //genarate slat
        const salt= await bcrypt.genSalt(10)

        const user=await getUser(req.body.email);
        if(!user){
            const hashedPassword=await bcrypt.hash(req.body.password, salt)
            const hashedUser=await {...req.body,password: hashedPassword}
            const result= await addUsers(hashedUser);
            return res.status(200).json({result:result,data:"Added"})
        }
        res.status(400).json({data:"Given email already exist"}) 
    } catch (error) {
        res.status(500).json("internal server error");
    }
})

router.post("/login",async(req,res)=>{
    try {
        //is user available 
        const user =await getUser(req.body.email)
        if(!user){
        return res.status(400).json({data:"invalid"})
        }
        //is password valid
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            return res.status(400).json({data:"invalid"})
        }
        const token =generateJwtToken(user._id)
        res.status(200).json({data:token,name:user.name})


    } catch (error) {
        res.status(500).json("internal server error");   
    }
})


router.post("/checkstring", async (req, res) => {
    
  
    try {
      // Check if the token matches the stored random string
      const isValidToken = await getRandom(req.query.token);
      if (!isValidToken) {
        return res.status(400).json({ data: "invalid token" });
      }
  
      // Proceed with password reset logic here
      // ...
  
      res.status(200).json({ data: "password reset successful" });
    } catch (error) {
      res.status(500).json("internal server error");
    }
  });

router.post("/checkmail",async(req,res)=>{
    try {
        //is user available 
        const user =await getUser(req.body.email)
        if(!user){
        return res.status(400).json({data:"invalid"})
        }
       
        
        const randomString = crypto.randomBytes(20).toString('hex');

    const result =await addRandomString(randomString,req.body.email)


    // Create the link with the random string
    const link = `http://localhost:3000/mailcheck?token=${randomString}`;

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: 'blake.mills@ethereal.email',
        pass: 'QDm1tFYXuPewf3d3Cs'
      },
    });

    let info = await transporter.sendMail({
      from: '"pizza 👻" <blake.mills@ethereal.email>', // sender address
      to: req.body.email, // list of receivers
      subject: "Reset Password", // Subject line
      text: `Click the following link to reset your password: ${link}`, // plain text body
      html: `<p>Click the following link to reset your password:</p><a href="${link}">${link}</a>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    res.json(info);
  } catch (error) {
    res.status(500).json("internal server error");
  }
})




export const usersRouter = router;
