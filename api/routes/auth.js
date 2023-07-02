const router = require('express').Router();
const User =require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const CLIENT_URL="http://localhost:3000"
//REGISTER
router.post('/register', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })
        const user =await newUser.save();;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username})
            !user && res.status(400).json("wrong username or password")

            const validate =await bcrypt.compare(req.body.password, user.password)
            !validate && res.status(400).json("wrong username or password")

            const{password, ...others} =user._doc;
            res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
})
// AUTH WITH GOOGLE
router.get('/google', passport.authenticate("google",{
    scope:["profile"]
}))


router.get('/login/success', (req, res) => {
    if(req.user)
    {res.status(200).json({
        success:true,
        message:"successfull",
        user:req.user
    });}
})
router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success:false,
        message:"failure"
    });
})


router.get("/google/callback",passport.authenticate("google",{
    successRedirect:CLIENT_URL,
    failureRedirect:"/login/failed"
}))
module.exports = router;