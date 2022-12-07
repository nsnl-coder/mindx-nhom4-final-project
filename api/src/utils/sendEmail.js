const nodemailer = require('nodemailer');

const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const hbs = require('nodemailer-express-handlebars');

const myOAuth2Client = new OAuth2Client(
  process.env.GOOGLE_MAILER_CLIENT_ID,
  process.env.GOOGLE_MAILER_CLIENT_SECRET
);
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
});
const sendEmail = async (email, username, title, text, link, text2) => {
  try {
    // Lấy thông tin gửi lên từ client qua body

    /**
     * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
     * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
     */
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    const myAccessToken = myAccessTokenObject?.token;

    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'nguyenquochaolop91@gmail.com',
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });
    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./src/views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/views'),
      extName: '.handlebars',
    };
    transport.set('oauth2_provision_cb', (user, renew, callback) => {
      let accessToken = userTokens[user];
      if (!accessToken) {
        return callback(new Error('Unknown user'));
      } else {
        return callback(null, accessToken);
      }
    });
    transport.use('compile', hbs(handlebarOptions));
    // mailOption là những thông tin gửi từ phía client lên thông qua API

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
    };

    // Gọi hành động gửi email
    await transport.sendMail(mailOptions);

    // Không có lỗi gì thì trả về success
  } catch (error) {
    // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
    console.log(error);
  }
};
module.exports = sendEmail;
