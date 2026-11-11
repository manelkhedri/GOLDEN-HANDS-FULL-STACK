
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = function (passport) {

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email']
      },

      async (accessToken, refreshToken, profile, done) => {
        try {

          // Get Google user information
          const email = profile.emails?.[0]?.value?.toLowerCase();
          const name = profile.displayName;
          const googleId = profile.id;

          // Check that Google verified the email
          if (
            !email ||
            profile._json.email_verified !== true
          ) {
            return done(null, false, {
              message: 'Google email is not verified'
            });
          }

          // Check if this Google account already exists
          let user = await User.findOne({ googleId });

          if (user) {
            return done(null, user);
          }

          // Check if email is already registered normally
          const existingUser = await User.findOne({ email });

          if (existingUser) {
            return done(null, false, {
              message: 'This email is already registered. Please use normal login.'
            });
          }

          // Create a new Google user
          user = await User.create({
            name,
            email,
            googleId
          });

          return done(null, user);

        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};
