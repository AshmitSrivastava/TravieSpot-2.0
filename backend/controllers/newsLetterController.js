const mssql = require('mssql');
const sendEmail = require('../utils/email');
const checkPassword  = require('../utils/validationUtils');
const dbConfig = require('../dbConfig');

// C - Create user
const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, reconfirm_password, gender, criminal_record, country, state, phone } = req.body;

    const pool = await mssql.connect(dbConfig);
    const passwordValidation = checkPassword(password);

    if (passwordValidation && password === reconfirm_password) {
      const result = await pool.request()
        .input('username', mssql.VarChar, username)
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, password)
        .input('gender', mssql.VarChar, gender)
        .input('criminal_record', mssql.VarChar, criminal_record)
        .input('country', mssql.VarChar, country)
        .input('state', mssql.VarChar, state)
        .input('phone', mssql.VarChar, phone)
        .query(`INSERT INTO dbo.registration_form(username, email, password, gender, criminal_record, country, state, phone) VALUES (@username, @email, @password, @gender, @criminal_record, @country, @state, @phone)`);

      sendEmail(username, email, password, gender, country, state, phone);
      res.status(200).json({ message: "Inserted new user" });
    } else {
      res.status(400).json({ message: "Duplicating Emails! or password not correct or passwords don't match" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occurred during registration" });
  }
};

// R - Get users
const getUser = async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM dbo.registration_form');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving users: " + err.message });
  }
};

// U - Update user
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, reconfirm_password, gender, criminal_record, country, state, phone } = req.body;

    if (password === reconfirm_password) {
      const pool = await mssql.connect(dbConfig);
      const result = await pool.request()
        .input('id', mssql.Int, id)
        .input('username', mssql.VarChar, username)
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, password)
        .input('gender', mssql.VarChar, gender)
        .input('criminal_record', mssql.VarChar, criminal_record)
        .input('country', mssql.VarChar, country)
        .input('state', mssql.VarChar, state)
        .input('phone', mssql.VarChar, phone)
        .query(`UPDATE dbo.registration_form SET username = @username, email = @email, password = @password, gender = @gender, criminal_record = @criminal_record, country = @country, state = @state, phone = @phone WHERE id = @id`);

      res.status(200).json({ message: "User updated successfully", result });
    } else {
      res.status(400).json({ error: "Passwords don't match" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error updating user: " + err.message });
  }
};

// D - Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(dbConfig);
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query('DELETE FROM dbo.registration_form WHERE id = @id');

    res.status(200).json({ message: "User deleted successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user: " + err.message });
  }
};

module.exports = {
  registerUser,
  getUser,
  editUser,
  deleteUser
};
