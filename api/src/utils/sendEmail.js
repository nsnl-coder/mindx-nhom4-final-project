const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
module.exports = async (email, username, title, text, link, text2) => {
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
    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./src/views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/views'),
      extName: '.handlebars',
    }
    transporter.use('compile', hbs(handlebarOptions))
    const mailOptions = {
      from: 'nguyenquochaolop9145645@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      template: 'email',
      context: {
        title,
        text,
        link,
        username,
        text2,
      },
    }
    await transporter.sendMail(
      mailOptions,
      function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('email sent successfully')
        }
      },
      (err) => {
        return console.log(err)
      }
    )
  } catch (err) {
    return console.log(err)
  }
}
