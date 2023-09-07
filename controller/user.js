
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');


//@desc Register a User
//@route Post /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    // console.log("the req body is : " + req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are Mandatory!!")
    }
    const userAvailable = await User.findOne({ email })

    if (userAvailable) {
        res.status(400);
        throw new Error("User already register")
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 8);
    // console.log("hash: " + hashedPassword);

    // USER Created
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }
})
//@desc Login User
//@route Post /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are Mandatory!!")
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        );
        res.status(200).json({ accessToken })
    } else {
        res.status(401);
        throw new Error("Password Invalid");
    }
})
//@desc Delete A Contact
//@route Get /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
})

module.exports = {
    currentUser, loginUser, registerUser
}