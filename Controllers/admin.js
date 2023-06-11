import { client } from "../db.js";
import  jwt  from "jsonwebtoken";

export function  addAdmin(userInfo){
    return client
    .db("restaurant")
    .collection("users")
    .insertOne(userInfo)
}

export function  getAdmin(userEmail){
    return client
    .db("restaurant")
    .collection("users")
    .findOne({email:userEmail})
}

export function  generateJwtToken(id){
    return jwt.sign({id}, process.env.SECRETKEY, {expiresIn:"30d"})   
}