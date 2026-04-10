const connectDB = require('../config/db');

// Get menu
exports.getMenu = async (req, res) => {
  try {
    const db = await connectDB();

    const [rows] = await db.query('SELECT * FROM menu');

    res.json(rows);
  } catch (err) {
    console.error("Error fetching menu:", err);
    res.status(500).send("Server Error");
  }
};

// Add menu item
exports.addMenuItem = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const db = await connectDB();

    await db.query(
      'INSERT INTO menu (name, price, category) VALUES (?, ?, ?)',
      [name, price, category]
    );

    res.send("Item added");
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).send("Server Error");
  }
};