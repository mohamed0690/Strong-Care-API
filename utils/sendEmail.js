import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohamedmahrous069@gmail.com",
      pass: "aihhupjcyqdraiyh",
    },
  });

  const info = await transporter.sendMail({
    from: `"Strong Care" <mohamedmahrous069@gmail.com>`,
    to: options.recipientEmail,
    subject: options.emailSubject,
    html: options.emailContent,
  });

  return info;
};
