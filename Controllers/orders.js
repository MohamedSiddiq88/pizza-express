import { ObjectId } from "bson";
import { client } from "../db.js";

export function getAllOrders() {
  return client
    .db("restaurant")
    .collection("order")
    .find()
    .toArray();
}

export function getOrderById(id) {
  return client
    .db("restaurant")
    .collection("order")
    .findOne({ _id: new ObjectId(id) });
}

export function createOrder(orderData) {
  return client
    .db("restaurant")
    .collection("order")
    .insertOne(orderData)
    .then(result => result.ops[0]);
}

export function updateOrder(id, updatedData) {
  return client
    .db("restaurant")
    .collection("order")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedData }, { returnOriginal: false });
}

export function deleteOrder(id) {
  return client
    .db("restaurant")
    .collection("order")
    .findOneAndDelete({ _id: new ObjectId(id) }, { projection: { _id: 0 } })
    .then(result => result.value);
}
