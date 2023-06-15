import express from "express";
import {
  addMenu,
  getAllMenu,
  deleteAllMenu,
  getMenuById,
  updateMenu,
  getCustomizationOptions,
  getCustomizationOptionByName,
  
} from "../Controllers/menu.js";

const router = express.Router();

router.get("/customise", async (req, res) => {
  try {
    const customizationOptions = await getCustomizationOptions();
    if (!customizationOptions) {
      res.status(400).send("Customization options not found");
      return;
    }
    res.status(200).json(customizationOptions);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.get("/customise/name", async (req, res) => {
  try {
    const { name } = req.body;
    const customizationOption = await getCustomizationOptionByName(name);
    if (!customizationOption) {
      res.status(400).send("Customization option not found");
      return;
    }
    res.status(200).json(customizationOption);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});


// router.put("/customise/update", async (req, res) => {
//   try {
//     const { name, quantity } = req.body;
//     if (!name || !quantity) {
//       return res.status(400).send({ data: "Incomplete data provided" });
//     }
//     const result = await updateCustomizationOptionByName(name, {quantity:quantity});
//     if (!result.value) {
//       res.status(404).send("Menu item not found");
//       return;
//     }
//     res.status(200).json({
//       data: { result: result, message: "Menu item updated successfully" },
//     });
//   } catch (error) {
//     res.status(500).json({ data: "Internal server error" });
//   }
// });




// router.put("/update/:type/:name", async (req, res) => {
//   try {
//     const { type, name } = req.params;
//     const updatedItem = req.body;
//     if (!type || !name || !updatedItem) {
//       return res.status(400).send({ data: "Incomplete data provided" });
//     }

//     let menuCategory = null;

//     switch (type) {
//       case "pizzaBase":
//         menuCategory = pizzaBase;
//         break;
//       case "sauce":
//         menuCategory = sauce;
//         break;
//       case "cheese":
//         menuCategory = cheese;
//         break;
//       case "veggies":
//         menuCategory = veggies;
//         break;
//       case "meat":
//         menuCategory = meat;
//         break;
//       default:
//         return res.status(400).send({ data: "Invalid menu category" });
//     }

//     const itemIndex = menuCategory.findIndex(
//       (item) => item.name.toLowerCase() === name.toLowerCase()
//     );

//     if (itemIndex === -1) {
//       return res.status(404).send({ data: "Menu item not found" });
//     }

//     menuCategory[itemIndex] = {
//       ...menuCategory[itemIndex],
//       ...updatedItem,
//     };

//     // Save the updated menu to the database or perform any other necessary actions

//     res.status(200).json({
//       data: {
//         message: "Menu item updated successfully",
//         updatedItem: menuCategory[itemIndex],
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ data: "Internal server error" });
//   }
// });





// router.put("/customise/update/:type", async (req, res) => {
//   try {
//     const { type } = req.params;
//     const { name, quantity } = req.body;

//     if (!type || !name || !quantity) {
//       return res.status(400).send({ data: "Incomplete data provided" });
//     }

//     const customizationOptions = await getCustomizationOptions();
//     if (!customizationOptions) {
//       return res.status(400).send("Customization options not found");
//     }

//     const menuItems = customizationOptions[type];
//     if (!menuItems) {
//       return res.status(400).send("Invalid menu type");
//     }

//     const menuItem = menuItems.find((item) => item.name === name);
//     if (!menuItem) {
//       return res.status(400).send("Menu item not found");
//     }

//     menuItem.quantity = quantity;

//     const result = await updateCustomizationOptions(customizationOptions);
//     res.status(200).json({
//       data: {
//         result: result,
//         message: "Menu item quantity updated successfully",
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ data: "Internal server error" });
//   }
// });



// router.put("/customise/update/:type/:name", async (req, res) => {
//   try {
//     const { type, name } = req.params;
//     const updatedQuantity = req.body.quantity;
//     if (!type || !name || !updatedQuantity) {
//       return res.status(400).send({ data: "Incomplete data provided" });
//     }

//     const customizationOptions = await getCustomizationOptions();
//     if (!customizationOptions) {
//       return res.status(400).send("Customization options not found");
//     }

//     const menuItems = customizationOptions[type];
//     if (!menuItems) {
//       return res.status(400).send("Invalid menu type");
//     }

//     const menuItem = menuItems.find((item) => item.name === name);
//     if (!menuItem) {
//       return res.status(400).send("Menu item not found");
//     }

//     menuItem.quantity = updatedQuantity;

//     const result = await updateCustomizationOptions(customizationOptions);
//     res.status(200).json({
//       data: {
//         result: result,
//         message: "Menu item quantity updated successfully",
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ data: "Internal server error" });
//   }
// });


// router.put("/customise/update/:name", async (req, res) => {
//   try {
//     const { name } = req.params;
//     const updatedQuantity = req.body.quantity;
//     if (!name || !updatedQuantity) {
//       return res.status(400).send({ data: "Incomplete data provided" });
//     }

//     const customizationOptions = await getCustomizationOptions();
//     if (!customizationOptions) {
//       return res.status(400).send("Customization options not found");
//     }

//     const pizzaBase = customizationOptions.pizzaBase.find(
//       (base) => base.name === name
//     );
//     if (!pizzaBase) {
//       return res.status(400).send("Pizza base not found");
//     }

//     pizzaBase.quantity = updatedQuantity;

//     const result = await updateCustomizationOptions(customizationOptions);
//     res.status(200).json({
//       data: {
//         result: result,
//         message: "Pizza base quantity updated successfully",
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ data: error });
//   }
// });


// router.put("/update/:type/:name", async (req, res) => {
//   try {
//     const { type, name } = req.params;
//     const { quantity } = req.body;
    
//     // Find the menu item to update
//     const menuItem = menu[type].find(item => item.name === name);
//     if (!menuItem) {
//       res.status(400).send("Menu item not found");
//       return;
//     }

//     // Update the quantity
//     menuItem.quantity = quantity;

//     // Save the updated menu item
//     const result = await updateCustomizationOptions(menu);

//     res.status(200).json({
//       data: { result: result, message: "Menu item updated successfully" },
//     });
//   } catch (error) {
//     res.status(500).json({ data: "Internal server error" });
//   }
// });


// router.put("/update/:type/:name", async (req, res) => {
//   try {
//     const { type, name } = req.params;
//     const { quantity } = req.body;
//     if (!type || !name || !quantity) {
//       return res.status(400).send({ data: "Incomplete data provided" });
//     }

//     let menu;
//     switch (type) {
//       case "pizzaBase":
//         menu = pizzaBase;
//         break;
//       case "sauce":
//         menu = sauce;
//         break;
//       case "cheese":
//         menu = cheese;
//         break;
//       case "veggies":
//         menu = veggies;
//         break;
//       case "meat":
//         menu = meat;
//         break;
//       default:
//         return res.status(400).send({ data: "Invalid menu type" });
//     }

//     const menuItem = menu.find((item) => item.name === name);
//     if (!menuItem) {
//       return res.status(400).send({ data: "Menu item not found" });
//     }

//     menuItem.quantity = quantity;

//     const customizationOptions = await getCustomizationOptions();
//     if (!customizationOptions) {
//       return res.status(400).send("Customization options not found");
//     }

//     const result = await updateCustomizationOptions(customizationOptions);
//     res.status(200).json({
//       data: { result: result, message: "Menu item updated successfully" },
//     });
//   } catch (error) {
//     res.status(500).json({ data: "Internal server error" });
//   }
// });



// router.put("/customise/update", async (req, res) => {
//   try {
//     const updatedOptions = req.body;
//     if (!updatedOptions) {
//       return res.status(400).send({ data: "No updated options provided" });
//     }

//     // Call a function to update the customization options with the provided data
//     const result = await updateCustomizationOptions(updatedOptions);

//     res.status(200).json({
//       data: { result: result, message: "Customization options updated successfully" },
//     });
//   } catch (error) {
//     res.status(500).json({ data: "Internal server error" });
//   }
// });



router.get("/all", async (req, res) => {
  try {
    const menu = await getAllMenu();
    if (menu.length <= 0) {
      res.status(400).send("Menu not found");
      return;
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await getMenuById(id);
    if (!menuItem) {
      res.status(400).send("Menu item not found");
      return;
    }
    res.status(200).json({ data: menuItem });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.post("/add", async (req, res) => {
  try {
    const newMenuItem = req.body;
    if (!newMenuItem) {
      return res.status(400).send({ data: "No menu details provided" });
    }
    const result = await addMenu(newMenuItem);
    res.status(200).send({
      data: { result: result, message: "New menu item added successfully" },
    });
  } catch (error) {
    res.status(500).send({ data: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMenuItem = req.body;
    if (!id || !updatedMenuItem) {
      return res.status(400).send({ data: "Incomplete data provided" });
    }
    const result = await updateMenu(id, updatedMenuItem);
    res.status(200).json({
      data: { result: result, message: "Menu item updated successfully" },
    });
  } catch (error) {
    res.status(500).json({ data: "Internal server error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const result = await deleteAllMenu();
    res
      .status(200)
      .json({ data: { result: result, message: "Menu items deleted" } });
  } catch (error) {
    res.status(500).json({ data: "Internal server error" });
  }
});

export const menuRouter = router;
