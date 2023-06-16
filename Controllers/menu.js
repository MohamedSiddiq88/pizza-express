import { ObjectId } from "bson";
import { client } from "../db.js";


export function updateMenuCutomization(name, updatedMenuItem) {
  return client
    .db("restaurant")
    .collection("PizzaCustomizationOptions")
    .updateOne(
      { "pizzaBase.name": name }, 
      { $set: { "pizzaBase.$.quantity": updatedMenuItem.quantity } } 
    );
}




export async function getCustomizationOptions() {
  return client
      .db("restaurant")
      .collection("PizzaCustomizationOptions")
      .find()
      .toArray();
      
}








export async function getCustomizationOptionByName(name) {
  const options = await client
    .db("restaurant")
    .collection("PizzaCustomizationOptions")
    .find()
    .toArray();

  for (const option of options) {
    if (option.pizzaBase) {
      for (const base of option.pizzaBase) {
        if (base.name === name) {
          return base;
        }
      }
    }
    if (option.sauce) {
      for (const sauce of option.sauce) {
        if (sauce.name === name) {
          return sauce;
        }
      }
    }
    if (option.cheese) {
      for (const cheese of option.cheese) {
        if (cheese.name === name) {
          return cheese;
        }
      }
    }
    if (option.veggies) {
      for (const veggie of option.veggies) {
        if (veggie.name === name) {
          return veggie;
        }
      }
    }
    if (option.meat) {
      for (const meat of option.meat) {
        if (meat.name === name) {
          return meat;
        }
      }
    }
  }

  return null; 
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
