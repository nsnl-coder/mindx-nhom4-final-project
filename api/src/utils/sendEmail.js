const nodemailer = require('nodemailer')
module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'nguyenquochaolop91@gmail.com',
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: process.env.GOOGLE_MAILER_ACCESS_TOKEN,
      },
    })
    const mailOptions = {
      to: email,
      subject: subject,
      text: text,
    }
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('email sent successfully')
      }
    })
  } catch (err) {
    return next(err)
  }
}
