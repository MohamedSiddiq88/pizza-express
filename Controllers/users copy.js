import { client } from "../db.js";
import  jwt  from "jsonwebtoken";

export function  addUsers(userInfo){
    return client
    .db("restaurant")
    .collection("admin")
    .insertOne(userInfo)
}

export function  getUser(userEmail){
    return client
    .db("restaurant")
    .collection("admin")
    .findOne({email:userEmail})
}

export function  generateJwtToken(id){
    return jwt.sign({id}, process.env.SECRETKEY, {expiresIn:"30d"})   
}