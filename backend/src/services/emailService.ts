import nodemailer from "nodemailer";
import aws from "aws-sdk";

export const sendWelcomeEmail = async (email: string, password: string) => {
  aws.config.update({
    accessKeyId: "AKIAUIFIU34UTEIMAVU7",
    secretAccessKey: "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",
    region: "ap-south-1",
  });
  const transporter = nodemailer.createTransport({
    SES: new aws.SES({ region: "ap-south-1", apiVersion: "2010-12-01" }),
  });
  try {
    await transporter.sendMail({
      from: `Legalkart<info@legalkart.com>`,
      to: email,
      subject: "Welcome to Legalkart!",
      html: `Email: ${email}<br/>Password: ${password}`,
    });
  } catch (err) {
    console.error("Some error occurred while sending welcome mail.");
    console.error(err);
  }
};
