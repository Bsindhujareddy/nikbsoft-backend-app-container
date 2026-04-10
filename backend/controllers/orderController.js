const connectDB = require('../config/db');

// Place order
exports.placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    const db = await connectDB();

    // Insert into orders table
    const [orderResult] = await db.query(
      'INSERT INTO orders (total) VALUES (?)',
      [total]
    );

    const orderId = orderResult.insertId;

    // Prepare bulk insert for order_items
    const values = items.map(item => [
      orderId,
      item.id,
      item.quantity
    ]);

    await db.query(
      'INSERT INTO order_items (order_id, item_id, quantity) VALUES ?',
      [values]
    );

    res.send("✅ Order placed successfully");
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).send("Server Error");
  }
};

// Get orders
exports.getOrders = async (req, res) => {
  try {
    const db = await connectDB();

    const [rows] = await db.query(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send("Server Error");
  }
};