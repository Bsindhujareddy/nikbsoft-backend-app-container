const mysql = require('mysql2/promise');
const getSecret = require('./secrets');

let connection;

async function connectDB() {
  if (!connection) {
    const secret = await getSecret();

    connection = await mysql.createConnection({
      host: secret.host,
      user: secret.username,
      password: secret.password,
      database: secret.database
    });

    console.log("✅ Connected to DB via Secrets Manager");
  }

  return connection;
}

module.exports = connectDB;