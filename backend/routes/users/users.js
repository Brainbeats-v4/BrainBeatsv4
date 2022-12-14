require("dotenv").config();
const bcrypt = require('bcryptjs');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");
const { getJWT, verifyJWT } = require("../../utils/jwt");
const { getUserExists } = require("../../utils/database");
// const multer  = require('multer')
// const upload = multer()
const fs = require('fs');
const crypto = require('crypto');

// Create a new user
router.post('/createUser', async (req, res) => {
    try {
        const { firstName, lastName, dob, email, username, password } = req.body;

        const userEmailExists = await getUserExists(email, "email");

        const userNameExists = await getUserExists(username, "username");

        if (userEmailExists || userNameExists) {
            return res.status(400).json({
                msg: "Email or username already exists. Please try again."
            });
        } else {
            //Encrypt user password
            encryptedPassword = await bcrypt.hash(password, 10);

            //Create a single record
            const newUser = await prisma.User.create({
                data: {
                    firstName,
                    lastName,
                    dob,
                    email,
                    username,
                    password: encryptedPassword,
                }
            });

            // Create JWT
            const token = getJWT(newUser.id, newUser.email);

            const data = {
                user: newUser,
                token: token
            }

            res.json(data);
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            msg: "Could not create user."
        });
    }
});

// Login an existing user
router.post('/loginUser', async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate if user exists in our database
        const userExists = await getUserExists(email, "email");

        // If password is related to the email console log a successful login
        if (userExists && await (bcrypt.compare(password, userExists.password))) {
            const token = getJWT(userExists.id, userExists.email);
            const data = {
                user: userExists,
                token: token
            }
            res.json(data);
        } else {
            return res.status(400).json({
                msg: "Invalid credentials"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err });
    }
});

// Get all users in the database
router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await prisma.User.findMany({
            select: {
                id: true,  
                firstName: true,
                lastName: true,
                email: true,
                dob: true,
                username: true,
                password: true,
                bio: true,
                createdAt: true,
            }
        });
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err });
    }
});

// Get user by username
router.get('/getUserByUsername', async (req, res) => {
    try {
        const userExists = await getUserExists(req.query.username, "username");

        if (!userExists) {
            return res.status(400).json({
                msg: "Username does not exist"
            });
        }
        res.json(userExists);
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err });
    }
});

// Get user by user ID
router.get('/getUserByID', async (req, res) => {
    try {
        const userExists = await getUserExists(req.query.id, "id");

        if (!userExists) {
            return res.status(400).json({
                msg: "User does not exist"
            });
        }
        res.json(userExists);
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err });
    }
});

// Get user profilePictures by id
router.get('/getUserImages', async (req, res) => {
    try {
        const userExists = await getUserExists(req.query.id, "id", {
            include: {
                profilePicture: true,
            }
        });

        if (!userExists) {
            return res.status(400).json({
                msg: "User does not exist"
            });
        }
        res.json(userExists);
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err });
    }
});

// Update user info 
router.put('/updateUser', async (req, res) => {
    try{
        const { id, firstName, lastName, email, username, bio, token, profilePicture } = req.body;
        
        const decoded = verifyJWT(token);

        if (!decoded) {
            return res.status(400).json({
                msg: "Invalid token"
                });
        }
                
        // Check if the user already exists in db
        const userExists = await getUserExists(id, "id");

        if (!userExists) {
            return res.status(400).json({
                msg: "User ID not found"
            });
        } else {
            //encryptedPassword = await bcrypt.hash(password, 10);

            const updateUser = await prisma.User.update({
                where: { id },
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    username: username,
                    bio: bio,
                    profilePicture: profilePicture
                }
            });
            res.status(200).send({msg: "User was successfully updated"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Delete user by ID
router.delete('/deleteUser', async (req, res) => {
    const decoded = verifyJWT(req.body.token);

    if (!decoded) {
        return res.status(400).json({
            msg: "Invalid token"
        });
    }

    try {
        const deleteUser = await prisma.User.delete({
            where: { id: req.body.id }
        });
        res.status(200).send({ msg: "Deleted a user" });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Do forgot password
router.post('/forgotPassword', async (req, res) => {
    try {
        const { email } = req.body;

        const userExists = await getUserExists(email, "email");

        if (!userExists) {
            return res.status(400).json({
                msg: "Email does not exist"
            });
        } else {
            // Generate token
            const token = crypto.randomBytes(48).toString('hex');

            // Update user in database with token and expiry date
            const updateUser = await prisma.User.update({
                where: { email },
                data: {
                    resetPasswordToken: token,
                    resetPasswordExpires: new Date(Date.now() + 3600000)
                }
            });

            // Set up transporter for email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.EMAIL_ADDRESS}`,
                    pass: `${process.env.EMAIL_PASSWORD}`
                }
            });

            // Create mailOptions to build the email
            const mailOptions = {
                from: `${process.env.EMAIL_ADDRESS}`,
                to: email,
                subject: 'Forgot Password - BrainBeats',
                text:
                    'Hi ' + `${updateUser.username}` + ', \n\n You are receiving this email beacuse you (or someone else) have requested to reset your password for your BrainBeats account. \n\n'
                    + 'Please click the following link, or paste this into your browser to complete the process within one hour of receiving it: \n\n'
                    + `http://brainbeats.dev/resetPassword?token=${token} \n\n`
                    + 'If you did not request this, please ignore this email and your password will remain unchanged. \n\n',
            };

            // Send email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json('Recovery email sent.');
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err });
    }
});

// Confirms reset of a password from an email by verifying token integrity
router.get('/reset', async (req, res) => {
    try {
        const resetPasswordToken = req.query.resetPasswordToken;

        const user = await prisma.User.findUnique({
            where: { 
                resetPasswordToken: resetPasswordToken,
                resetPasswordExpires: {
                    $gt: Date.now(),
                },
            },
        });

        if (!user) {
            return res.status(400).json({
                msg: "Password reset link is invalid or has expired."
            });
        }
            
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err });
    }
});

module.exports = router;