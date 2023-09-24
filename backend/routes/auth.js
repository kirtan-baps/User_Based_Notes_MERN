const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jaySwaminar@y@n'

const fetchUser = require('../middleware/fetchUser')


// Create a User using :POST "/api/auth" .Does'nt require Auth
router.post('/createuser', [
    body('name', "Enter a Valid Name").isLength({ min: 3 }),
    body('password', "Enter a Valid password").isLength({ min: 5, max: 12 }),
    body('email', "Enter a Valid email").isEmail(),
], async (req, res) => {
    console.log(req.body);

    // Way 1
    // const user = User(req.body);
    // user.save();

    // Way 2
    // const user = User.create(req.body);
    // const user = User.insertMany(req.body);

    // Way 3
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    let user = await User.findOne({ email: req.body.email })
    // console.log("Seeeee, ", user);
    // console.log("Seeeee, ", !user);
    if (user) {
        return res.status(400).json({ error: "User Already Exists with this email" });
    }

    const salt = await bcrypt.genSalt(10)
    const securedPassword = await bcrypt.hash(req.body.password, salt);


    try {
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        })

        const data = {
            user: {
                id: user._id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);


        res.json([{ status: "Inserted", authToken: authToken }, user]);
    } catch (error) {
        console.log(error); res.status(500).json({ error: "Some Error Occurred" })
    }
})

// Authenticate(Login) a User using :POST "/api/auth" .Does'nt require Auth
router.post('/login', [
    body('email', "Enter a Valid email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // This Both syntax are same
        // User.findOne({ email: email });
        let user = await User.findOne({ email });
        if (!user) {
            // IN JSON This sentence can be useful for hacking 
            // return res.status(400).json({ error: "User Does not Exists" });

            // IN JSON so use
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user._id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        res.json([{ status: "Founded", authToken: authToken }, user]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Some Error Occurred" })
    }
});

// Getting User logged in Details using   :POST "/api/auth/getuser" login Required
router.post('/getuser', fetchUser, async (req, res) => {
    console.log(req.user.id);

    try {
        const userId = req.user.id;

        /* `const user = await User.findById(userId).select("-password")` is retrieving a user from the
        database by their ID and excluding the password field from the returned user object using (-) operator. */

        const user = await User.findById(userId).select("-password")

        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Some Error Occurred" })
    }
})



module.exports = router;