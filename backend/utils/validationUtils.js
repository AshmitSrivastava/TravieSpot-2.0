const mssql = require('mssql');
const dbConfig = require('../dbConfig');

let checkEmail = async (email) => {
    const pool = await mssql.connect(dbConfig);
    //console.log(email);
    var result = '';
    result = await pool.request()
      .input('email', mssql.VarChar, email)
      .query('SELECT * FROM dbo.registration_form WHERE email = @email');
    //console.log(result);
    if (result == '') {
      return true
    }
    else {
      return false
    }
  };

const  checkPassword = async (password) => {
    //console.log(password);
    if (password.length <= 6 && password.length >= 20) {
      console.log("Not of appropriate length");
      return false;
    }
  
    if (!/[A-Z]/.test(password)) {
      console.log('Password doesnt have one uppercase letter');
      return false;
    }
  
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      console.log('No special character');
      return false; 
    }
  
    else {
      return true
    }
  };

  module.exports = checkEmail , checkPassword;