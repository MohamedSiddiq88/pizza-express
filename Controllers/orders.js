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

export async function createOrder(orderData) {
  const result = await client
    .db("restaurant")
    .collection("order")
    .insertOne(orderData);
  return result.ops[0];
}

export function updateOrder(id, updatedData) {
  return client
    .db("restaurant")
    .collection("order")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedData }, { returnOriginal: false });
}

export async function deleteOrder(id) {
  const result = await client
    .db("restaurant")
    .collection("order")
    .findOneAndDelete({ _id: new ObjectId(id) }, { projection: { _id: 0 } });
  return result.value;
}
