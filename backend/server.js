//imports
const express = require("express");
const mssql = require("mssql");
const body_parser = require("body-parser");
const app = express();
const cors = require('cors');
const port = 3000;
const nodemailer = require('nodemailer');
require('dotenv').config({ path: "../frontend/.env" });

//middleware wala folder
const upload = require('./upload');

// console.log(process.env.EMAIL_USERNAME);
// console.log(process.env.OAUTH_CLIENTID);
// console.log(process.env.OAUTH_CLIENT_SECRET);`
// console.log(process.env.OAUTH_REFRESH_TOKEN);

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use('./uploads', express.static('uploads'));

let uploadedFilePath = '';


//email work
function sendEmail(username, email, password, gender, country , state , phone) {
  console.log("Within sendEmail");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: process.env.OAUTH_ACCESS_TOKEN
    }
  });

  const mailConfigurations = {
    from: 'ashmitsrivastava1607@gmail.com',
    to: email,
    subject: "Thanks for signing up to the TravieSpot NewsLetter UWU",
    html: "<h2> Hi " + username + " </h2>" + 
    "<h5>Youve Signed in using the following Information : <br></h5> " 
      + "Username:  " + username + "<br>" +
      "Email : " + email + "<br>" +
      "with your Phone Number as : " + phone + " <br>"+
      "Password : " + password + "<br>" +
      "Gender : "  + gender + "<br>" + 
      "Location : " + country  + " , "+ state + "<br>" + 
      "PLease Note: If youve added any attachments to the file please find it below! <br>",
    attachments: [
      {
        path: uploadedFilePath
      }
    ]
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("Mail sent successfully");
    //console.log(info);
  });
}


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

mssql.connect(dbConfig).then(pool => {
  if (pool.connected) {
    console.log("Connected");
  } else {
    console.error("Connection failed");
  }
}).catch(err => {
  console.error("connection error: " + err.message);
});

async function checkEmail(email) {
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
}


function checkPassword(password) {
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
}

// C 
app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, reconfirm_password , gender , criminal_record , country , state , phone } = req.body;
    //console.log(reconfirm_password);
    // if(password != reconfirm_password){
    //   res.status(400).json({message : "Passwords dont match"});
    // }
    const pool = await mssql.connect(dbConfig);
    const emailExists = checkEmail(email);
    const passwordValidation = checkPassword(password);
    console.log(passwordValidation);
    //checkingif the email and the password is the same
    if (emailExists && passwordValidation && password   == reconfirm_password) {
      const result = await pool.request()
        .input('username', mssql.VarChar, username)
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, password)
        .input('gender', mssql.VarChar, gender)
        .input('criminal_record' , mssql.VarChar , criminal_record)
        .input('country', mssql.VarChar , country)
        .input('state', mssql.VarChar , state)
        .input('phone', mssql.VarChar, phone)
        .query(`INSERT INTO dbo.registration_form(username, email, password, gender , criminal_record, country ,state, phone) VALUES (@username, @email, @password , @gender , @criminal_record , @country , @state , @phone)`);
      sendEmail(username, email, password, gender , country , state, phone);
      res.status(200).json({ message: "Inserted new user" });
    }
    else {
      res.status(400).json({ message: " duplicating Emails! or password not correct or passwords dont match" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occurred during registration" });
  }
});

// handling file uploads
app.post("/upload", upload.single('file'), async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" })
  }
  uploadedFilePath = req.file.path;
  res.status(200).json({ message: "File uploaded successfully!!!!!" });
  console.log("Uploaded file");
  //sendEmail(username , email , password , uploadedFilePath);
});

// R
app.get('/users', async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool.request()
      .query('SELECT * FROM dbo.registration_form');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving users: " + err.message });
  }
});

// U
app.put('/users/:id', async (req, res) => {
  console.log(req.body);
  let id = req.params.id;
    try{
    console.log(id);
    console.log(req.body);
    console.log("updation " + id);
    const { username, email, password, reconfirm_password , gender , criminal_record , country , state , phone } = req.body;

    if (password == reconfirm_password) {
      const pool = await mssql.connect(dbConfig);
      const result = await pool.request()
        .input('id', mssql.Int, id)
        .input('username', mssql.VarChar, username)
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, password)
        .input('gender' , mssql.VarChar , gender)
        .input('criminal_record', mssql.VarChar , criminal_record)
        .input('country', mssql.VarChar , country)
        .input('state', mssql.VarChar , state)
        .input('phone', mssql.VarChar , phone)
        .query(`UPDATE dbo.registration_form 
              SET username = @username, 
                  email = @email, 
                  password = @password, 
                  gender = @gender, 
                  criminal_record = @criminal_record, 
                  country = @country, 
                  state = @state, 
                  phone = @phone 
              WHERE id = @id`);
      console.log(`User with id ${id} has been updated`);
      res.status(200).json({ message: "User updated successfully", result });
        }
        else{
      res.status(500).json({ error: "Passwords dont match brotha" });
        }
  }
  catch(err){
    res.status(500).json({ error: "Error updating user: " + err.message });
  }
});

// D
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const pool = await mssql.connect(dbConfig);
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query('DELETE FROM dbo.registration_form WHERE id = @id');
    console.log(`User deleted with id  = ${id}`)
    res.status(200).json({ message: "User deleted successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user: " + err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
