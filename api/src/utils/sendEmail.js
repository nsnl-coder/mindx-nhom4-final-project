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
      from: 'nguyenquochaolop9145645@gmail.com',
      to: email,
      subject: subject,
      text: text,
      html: '<p style={{color:"red",fontSize:"30px"}}>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
      amp: `<!doctype html>
      <html ⚡4email>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
          <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
          <p>GIF (requires "amp-anim" script in header):<br/>
            <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
        </body>
      </html>`,
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
        return next(err)
      }
    )
  } catch (err) {
    return next(err)
  }
}
