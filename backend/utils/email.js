const nodemailer = require('nodemailer');
require('dotenv').config({ path: "../../frontend/.env" });
//email work
function sendEmail(username, email, password, gender, country , state , phone, uploadedFilePath) {
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

  module.exports = sendEmail;