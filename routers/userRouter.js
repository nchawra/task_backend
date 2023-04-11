const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/create-user", async (req, res) => {
    const { email, password, role } = req.body;

    if (email === undefined || password === undefined || role === undefined) {
        return res
            .status(400)
            .json({ message: "Please provide email and password" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
        const newUser = {
            email,
            password: hash,
            role,
        };
        await User.create(newUser);
        res.status(201).json({ message: "User created" });
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
        return res
            .status(400)
            .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            const token = jwt.sign({ user: user }, "secretRandomToken", {
                expiresIn: "1h",
            });
            res.status(200).json({ message: "Logged in", token: token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });
});

module.exports = router;
