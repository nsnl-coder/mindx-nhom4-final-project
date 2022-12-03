const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_HOST}/api/auth/google/callback`,
      scope: ['profile', 'email'],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const { id, _json } = profile;

      // if not exist, create
      // if exist, update
      const user = await User.findOneAndUpdate(
        {
          googleId: id,
        },
        {
          firstName: _json.given_name,
          lastName: _json.family_name,
          profileImage: _json.picture,
          email: _json.email,
          username: _json.email.replace('@', ''),
        },
        { upsert: true, new: true }
      );
      cb(null, user);
    }
  )
);
