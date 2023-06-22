const Item = require("../models/itemModel");

const itemCtrl = {
  authMiddleware: async (req, res, next) => {
    try {
      await Item.authMiddleware(req);
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
  getAllItems: async (req, res) => {
    try {
      const items = await Item.getAllItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  },
  getItemById: async (req, res) => {
    try {
      const itemId = req.params.itemId;
      const item = await Item.getItemById(itemId);
      res.json(item);
    } catch (error) {
      console.error("Error fetching item:", error);
      res.status(500).json({ error: "Failed to fetch item" });
    }
  },
  addItem: async (req, res) => {
    try {
      const { name, desc, price } = req.body;
      const itemData = { name, desc, price };
      const itemId = await Item.addItem(itemData);
      res.json({ itemId });
    } catch (error) {
      console.error("Error adding item:", error);
      res.status(500).json({ error: "Failed to add item" });
    }
  },

  updateItem: async (req, res) => {
    try {
      const { itemId } = req.params;
      const { name, desc, price } = req.body;
      const itemData = { name, desc, price };

      const success = await Item.updateItem(itemId, itemData);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ error: "Failed to update item" });
    }
  },

  deleteItem: async (req, res) => {
    try {
      const { itemId } = req.params;
      const success = await Item.deleteItem(itemId);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Failed to delete item" });
    }
  },
};

module.exports = itemCtrl;
