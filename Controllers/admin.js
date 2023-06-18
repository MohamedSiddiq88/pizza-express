import { client } from "../db.js";
import  jwt  from "jsonwebtoken";

export function  addAdmin(userInfo){
    return client
    .db("restaurant")
    .collection("admin")
    .insertOne(userInfo)
}

export function  getAdmin(userEmail){
    return client
    .db("restaurant")
    .collection("admin")
    .findOne({email:userEmail})
}

export function  generateJwtToken(id){
    return jwt.sign({id}, process.env.SECRETKEY, {expiresIn:"30d"})   
}

export function addRandomString(randomString,email){
    return client
    .db("restaurant")
    .collection("randomstring")
    .insertOne({
        randomString: randomString,
        email:email
      })
}

export function  getRandom(randomString){
    return client
    .db("restaurant")
    .collection("randomstring")
    .findOne({randomString: randomString})
}

export function deleteRandomString(randomString){
     client
        .db("restaurant")
        .collection("randomstring")
        .deleteOne({ randomString: randomString });
}

export function updatePassword(email,password){
    return client
        .db("restaurant")
        .collection("users")
        .updateOne({ email: email }, { $set: { password: password } });
}