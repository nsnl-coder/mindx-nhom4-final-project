const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/user');
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
      callbackURL: `https://media-server-appp.herokuapp.com/api/auth/google/callback`,
      scope: ['profile', 'email'],
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
