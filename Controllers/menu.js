import { ObjectId } from "bson";
import { client } from "../db.js";

export async function getCustomizationOptions() {
  return client
      .db("restaurant")
      .collection("PizzaCustomizationOptions")
      .find()
      .toArray();
      
}

export function updateCustomizationOptionByName(
  name,
  updatedCustomizationOption
) {
  const filter = {};
  const update = {};

  if (updatedCustomizationOption.pizzaBase) {
    filter["pizzaBase.name"] = name;
    update.$set = { "pizzaBase.$": updatedCustomizationOption };
  } else if (updatedCustomizationOption.sauce) {
    filter["sauce.name"] = name;
    update.$set = { "sauce.$": updatedCustomizationOption };
  } else if (updatedCustomizationOption.cheese) {
    filter["cheese.name"] = name;
    update.$set = { "cheese.$": updatedCustomizationOption };
  } else if (updatedCustomizationOption.veggies) {
    filter["veggies.name"] = name;
    update.$set = { "veggies.$": updatedCustomizationOption };
  } else if (updatedCustomizationOption.meat) {
    filter["meat.name"] = name;
    update.$set = { "meat.$": updatedCustomizationOption };
  } else {
    return null; // Invalid customization option
  }

  return client
    .db("restaurant")
    .collection("PizzaCustomizationOptions")
    .findOneAndUpdate(filter, update);
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

  return null; // Customization option not found
}


// export function updateCustomizationOptionByName(name, updatedCustomizationOption) {
//   return client
//     .db("restaurant")
//     .collection("PizzaCustomizationOptions")
//     .findOneAndUpdate(
//       { name: name },
//       { $set: updatedCustomizationOption }
//     );
// }


// export function updateMenuByPizzaBaseName(name, updatedQuantity) {
//   return client
//     .db("restaurant")
//     .collection("menu")
//     .findOneAndUpdate(
//       { "pizzaBase.name": name },
//       { $set: { "pizzaBase.$.quantity": updatedQuantity } }
//     );
// }


// export function updateCustomizationOptions(updatedOptions) {
//   return client
//     .db("restaurant")
//     .collection("PizzaCustomizationOptions")
//     .updateMany({}, { $set: updatedOptions });
// }



// export function updateCustomizationOptions(customizationOptions) {
//   return client
//     .db("restaurant")
//     .collection("PizzaCustomizationOptions")
//     .findOneAndUpdate({}, { $set: customizationOptions }, { returnOriginal: false });
// }


// export function updateCustomizationOptions(customizationOptions) {
//   return client
//     .db("restaurant")
//     .collection("PizzaCustomizationOptions")
//     .findOneAndUpdate({}, { $set: customizationOptions });
// }



// export async function updateCustomizationOptions(updatedOptions) {
//   try {
//     const result = await client
//       .db("restaurant")
//       .collection("PizzaCustomizationOptions")
//       .updateOne({}, { $set: updatedOptions });

//     if (result.modifiedCount === 1) {
//       return true;
//     } else {
//       throw new Error("Failed to update customization options");
//     }
//   } catch (error) {
//     throw new Error("Failed to update customization options");
//   }
// }

// export function updateCustomizationOptions(updatedOptions) {
//   return client
//     .db("restaurant")
//     .collection("PizzaCustomizationOptions")
//     .replaceOne({}, updatedOptions);
// }

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
