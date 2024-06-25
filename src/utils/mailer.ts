import nodemailer from "nodemailer";

export const sendMail = async (email: string, subject: string, text: string) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  });

  console.log("Message sent: %s", info.messageId);
};
