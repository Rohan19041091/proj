import Mentor from "../models/mentorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secretKey } from "../utils/constant.js";
import { sendResponse, sendErrorResponse } from "../utils/helper.js";

const mentorLogin=async(req,res)=>{
    const{email,password}=req.body;
    const mentor = await Mentor.findOne({email});
    if(!mentor){
      sendErrorResponse(res, 400, 'user not found');
    }
    
    const userPasswordMatch =  bcrypt.compare(password,mentor.password)
    if(userPasswordMatch){
       const mentorToken = jwt.sign({email:mentor.email,},secretKey, { expiresIn: '1h' })
       sendResponse(res, "User token ", {mentorToken});
    }
    else{
      sendErrorResponse(res, 400, 'incorrect password');
    }
  
  }
  export {mentorLogin}