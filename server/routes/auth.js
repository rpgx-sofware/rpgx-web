const jwt = require('jsonwebtoken')
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const {sequelize, User,RefreshToken} = require("../models")
const verifyJWT = require("../middleware/verifyJWT")
require('dotenv').config();

router.post("/login",async(req, res) => {
    const user = await User.findOne({where: {name: req.body.user}})
    if(user != null){
        console.log("found user")
        bcrypt.compare(req.body.pwd, user.password, async(err, result) => {
            const accessToken = jwt.sign(
                {"name": user.name},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1h'}
            );
            const refreshToken = jwt.sign(
                {"name": user.name},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '7d'}
            );
            await RefreshToken.create({userId: user.id,token: refreshToken});
            res.cookie('jwt',refreshToken,{httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
            res.json({token: accessToken,perms: ["view.basic"]});
        });
    }
});

router.post("/register",(req, res) => {
    console.log("got here")
    console.log(req.body.user)
    bcrypt.hash(req.body.pwd, 10, async(err, hash) =>{
        const {user,pwd,email} = req.body
        const newUser = await User.create({name: user,email: email,password: hash})
    });
});

router.get("/refresh", async(req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt

    const token = await RefreshToken.findOne({where: {token: refreshToken}, include: [User] })
    if(!token.User) return res.sendStatus(403);

    jwt.verify(
        token.token,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            if (err || token.User.name !== decoded.name) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"name": decoded.name},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({accessToken})
        }
    )

    console.log(token)
})


router.post("/logout", async(req, res) => {

    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt

    const token = await RefreshToken.findOne({where: {token: refreshToken}, include: [User] })
    if(!token.User){
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204);
    }

    await RefreshToken.destroy({ where: {id: token.id}});
    res.clearCookie('jwt', {httpOnly: true});
    res.sendStatus(204);
})

router.post("/verifylogin", verifyJWT, async(req, res) => {

})

module.exports = router