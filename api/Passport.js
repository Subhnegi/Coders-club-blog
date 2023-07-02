const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require("./models/User");
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback"
},  function (accessToken, refreshToken, profile,done) {
    const user = User.findOne({username: profile.username}).then((currentUser) => {
        if(currentUser){
            console.log(currentUser)
        }

        else{
            // new User({
            //     username:profile.displayName,
            //     profilePic:profile.photos[0].value,
            //     email:profile.id +"@gmail.com",
            //     password:profile.id
            // }).save();
        }
    })
    
}
));
passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})