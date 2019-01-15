var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

// telling passport we want to use a local strategy. in other words we want to login with a
passport.use(
  new LocalStrategy(
    // Our user will sign in using an username, rather than a "username"
    {
      usernameField: "username"
    },
    function(username, password, done) {
      // when a user signs in, this code is run
      db.User.findOne({ username: username }).then(function(dbUser) {
        // If there is no user with that username
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect username."
          });
        }
        // If there is a user with the given username, but the password is incorrect, this code is run
        else if (dbUser.password != password) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
