const domain = process.env.NEXT_PUBLIC_APP_URL;
import nodemailer from "nodemailer";

const { EMAIL_USER, EMAIL_PASS } = process.env;

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const transporter = createTransporter();

  const mailData = {
    from: EMAIL_USER,
    to: email,
    subject: "Mudança de senha",
    html: `<p>Clique <a href=${resetLink}>aqui</a> para concluir mudar sua senha:</p>`,
  };

  try {
    const info = await transporter.sendMail(mailData);
    console.log("Password reset email sent:", info);
  } catch (err) {
    console.error("Error sending password reset email:", err);
    throw err;
  }
};

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const transporter = createTransporter();

  const mailData = {
    from: EMAIL_USER,
    to: email,
    subject: "Confirme seu email",
    html: `<p>Clique <a href=${confirmLink}>aqui</a> para concluir a autenticação:</p>`,
  };

  try {
    const info = await transporter.sendMail(mailData);
    console.log("Verification email sent:", info);
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw err;
  }
};
