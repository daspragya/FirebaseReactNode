const express = require("express");
const router = express.Router();
const itemCtrl = require("../controllers/itemCtrl");

router.get("/items", [itemCtrl.authMiddleware], itemCtrl.getAllItems);
router.get("/item/:itemId", [itemCtrl.authMiddleware], itemCtrl.getItemById);
router.post("/item", [itemCtrl.authMiddleware], itemCtrl.addItem);
router.put("/item/:itemId", [itemCtrl.authMiddleware], itemCtrl.updateItem);
router.delete("/item/:itemId", [itemCtrl.authMiddleware], itemCtrl.deleteItem);

module.exports = router;
