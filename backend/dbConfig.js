const mssql = require('mssql');
// Connection string
const dbConfig = {
    user: "sa",
    password: "12345",
    server: "LAPTOP-JTDH0LQ5\\SQLEXPRESS01",
    database: "crud_form",
    port: 1433,
    options: {
      encrypt: false
    }
  };

  //connecting mssql

mssql.connect(dbConfig).then(pool => {
  if (pool.connected) {
    console.log("Connected");
  } else {
    console.error("Connection failed");
  }
}).catch(err => {
  console.error("connection error: " + err.message);
});

  module.exports = dbConfig;