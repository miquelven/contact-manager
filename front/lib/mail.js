const domain = process.env.NEXT_PUBLIC_APP_URL;

import nodemailer from "nodemailer";

const { EMAIL_USER, EMAIL_PASS } = process.env;

export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailData = {
    from: EMAIL_USER,
    to: email,
    subject: "Mudança de senha",
    html: `<p>Clique <a href=${resetLink}>aqui</a> para concluir mudar sua senha:</p>  `,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, reject) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailData = {
    from: EMAIL_USER,
    to: email,
    subject: "Confirme seu email",
    html: `<p>Clique <a href=${confirmLink}>aqui</a> para concluir a autenticação:</p>  `,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};
