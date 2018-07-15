import nodemailer from 'nodemailer'

function setup(){
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
}

export function sendConfirmationEmail(user){
    const tranport = setup();
    const email = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Welcom to Bookworm',
        text:`
        Welcome to Bookworm, please confirm your email.

        ${user.generateConfirmationUrl()}
        `
    }
    tranport.sendMail(email);
}

export function sendResetPasswordEmail(user){
    const tranport = setup();
    const email = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Reset Password',
        text:`
        To reset password follow this link.

        ${user.generateResetPasswordLink()}
        `
    }
    tranport.sendMail(email);
}
