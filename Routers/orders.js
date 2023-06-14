import express from "express";
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "../Controllers/orders.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const newOrder = req.body;
    if (!newOrder) {
      res.status(400).json({ error: "No order details provided" });
      return;
    }
    const createdOrder = await createOrder(newOrder);
    res.status(201).json({ data: createdOrder, message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrderData = req.body;
    if (!updatedOrderData) {
      res.status(400).json({ error: "No updated order data provided" });
      return;
    }
    const updatedOrder = await updateOrder(id, updatedOrderData);
    if (!updatedOrder) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json({ data: updatedOrder, message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await deleteOrder(id);
    if (!deletedOrder) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json({ data: deletedOrder, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export const ordersRouter = router;
