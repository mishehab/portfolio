import axios from 'axios';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper function to send a message via Telegram
async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    });
    return res.data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error.response?.data || error.message);
    return false;
  }
}

// Helper function to send email via Gmail
async function sendEmail({ name, email, message }) {
  // Create reusable transporter object using Gmail SMTP
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,  // your Gmail account
      pass: process.env.GMAIL_PASS,  // your Gmail app password
    },
  });

  // Email options
  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // or any email you'd like to receive messages
    subject: `New contact form message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send mail
  return transporter.sendMail(mailOptions);
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message: userMessage } = payload;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    let chat_id = process.env.TELEGRAM_CHAT_ID;

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    let telegramSuccess = false;
    let emailSuccess = false;

    if (token) {
      if (!chat_id) {
        try {
          const updatesRes = await axios.get(`https://api.telegram.org/bot${token}/getUpdates`);
          const updates = updatesRes.data?.result || [];
          for (let i = updates.length - 1; i >= 0; i--) {
            const u = updates[i];
            const cid = u?.message?.chat?.id || u?.channel_post?.chat?.id || u?.callback_query?.message?.chat?.id;
            if (cid) {
              chat_id = cid.toString();
              break;
            }
          }
        } catch (err) {
          console.warn('Failed to auto-detect Telegram chat id via getUpdates:', err?.message || err);
        }
      }
      if (chat_id) {
        telegramSuccess = await sendTelegramMessage(token, chat_id, message);
      }
    }

    // Send email via Gmail
    try {
      await sendEmail({ name, email, message: userMessage });
      emailSuccess = true;
    } catch (err) {
      console.error('Error sending email:', err.message);
    }

    return NextResponse.json({
      success: telegramSuccess || emailSuccess,
      telegramSent: telegramSuccess,
      emailSent: emailSuccess,
    });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
}
