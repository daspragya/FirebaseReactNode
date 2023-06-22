const admin = require("../config/firebaseAdmin");

const db = admin.firestore();

class Item {
  static async authMiddleware(req) {
    try {
      const idToken = req.headers.authentication.replace(/"/g, "");
      await admin.auth().verifyIdToken(idToken);
      return true;
    } catch (error) {
      console.error("Error verifying ID token:", error);
      throw error;
    }
  }

  static async getAllItems() {
    try {
      const snapshot = await db.collection("items").get();
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return items;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  }

  static async getItemById(itemId) {
    try {
      const itemRef = db.collection("items").doc(itemId);
      const snapshot = await itemRef.get();

      if (snapshot.exists) {
        const itemData = snapshot.data();
        return { id: snapshot.id, ...itemData };
      } else {
        throw new Error("Item not found");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  }

  static async addItem(itemData) {
    try {
      const itemRef = await db.collection("items").add(itemData);
      return itemRef.id;
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  }

  static async updateItem(itemId, itemData) {
    try {
      const itemRef = db.collection("items").doc(itemId);
      const snapshot = await itemRef.get();

      if (snapshot.exists) {
        await itemRef.update(itemData);
        return true;
      } else {
        throw new Error("Item not found");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  static async deleteItem(itemId, tenantId) {
    try {
      const itemRef = db.collection("items").doc(itemId);
      const snapshot = await itemRef.get();

      if (snapshot.exists) {
        const itemData = snapshot.data();
        if (itemData.tenantId === tenantId) {
          await itemRef.delete();
          return true;
        } else {
          throw new Error("Item does not belong to the specified tenant");
        }
      } else {
        throw new Error("Item not found");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }
}

module.exports = Item;
