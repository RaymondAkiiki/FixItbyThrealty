const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
const transporter = nodemailer.createTransport({
service: "Gmail", // Replace with your email service
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
},
});
//add back slashes to user and pass fields after build 
const mailOptions = {
from: process.env.EMAIL_USER,
to: email,
subject: subject,
text: message,
};

await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;