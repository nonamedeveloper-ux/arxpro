const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function testMail() {
  console.log('Using config:');
  console.log('Host:', process.env.MAIL_HOST);
  console.log('Port:', process.env.MAIL_PORT);
  console.log('User:', process.env.MAIL_USER);
  console.log('Pass:', process.env.MAIL_PASS ? '********' : 'MISSING');

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Number(process.env.MAIL_PORT) === 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  try {
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_USER, // Send to self
      subject: 'Test Email',
      text: 'If you see this, email integration works!',
    });
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Email sending failed!');
    console.error('Error:', error);
  }
}

testMail();
