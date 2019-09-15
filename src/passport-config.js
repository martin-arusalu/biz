const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('./models/user');
const { secret } = require('./config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              username: user.username,
              email: user.email,
            });
          }
          return done(null, false);
        }).catch(err => console.error(err));
    })
  );
};