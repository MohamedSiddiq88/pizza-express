import { ObjectId } from "bson";
import { client } from "../db.js";

export async function getCustomizationOptions() {
  return client
      .db("restaurant")
      .collection("PizzaCustomizationOptions")
      .find();
      
}

export function getAllMenu() {
  return client.db("restaurant").collection("menu").find().toArray();
}

export function getMenuById(id) {
  return client
    .db("restaurant")
    .collection("menu")
    .findOne({ _id: new ObjectId(id) });
}

export function addMenu(menuItem) {
  return client.db("restaurant").collection("menu").insertMany(menuItem);
}

export function updateMenu(id, updatedMenuItem) {
  return client
    .db("restaurant")
    .collection("menu")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedMenuItem });
}

export function deleteAllMenu() {
  return client.db("restaurant").collection("menu").deleteMany({});
}
