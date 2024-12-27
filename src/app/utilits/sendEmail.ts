import nodemailer from 'nodemailer';
export const sendEmail = async (to: string, resetPasswordUILink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'mdsirajulnoman@gmail.com',
      pass: 'smec oqlg lifb pbrw',
    },
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: 'mdsirajulnoman@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset PH University password within 10 minutes ✔', // Subject line
    text: 'change the password?', // plain text body
    html: `${resetPasswordUILink}`, // html body
  });
};
