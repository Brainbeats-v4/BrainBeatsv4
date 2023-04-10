require("dotenv").config();
const bcrypt = require('bcryptjs');
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");
const { createJWT, verifyJWT } = require("../../utils/jwt");
const { getUserExists, getIsTokenExpired } = require("../../utils/database");
var nodemailer = require("nodemailer");
// const multer  = require('multer')
// const upload = multer()
const fs = require('fs');
const crypto = require('crypto');

// Create a new user
router.post('/createUser', async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, profilePicture } = req.body;
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

            const newUser = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    username,
                    password: encryptedPassword,
                    profilePicture
                }
            });
            // Create JWT
            const token = createJWT(newUser.id, newUser.email);
            const data = {
                user: newUser,
                token: token
            }

            res.json(data);
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            err
            //msg: "Could not create user."
        });
    }
});

// Logout an existing user
router.post('/logoutUser', async (req, res) => {
    try {
        // Get user input
        const { email, jwt } = req.body;

        // Validate if user exists in our database
        const userExists = await getUserExists(email, "email");
        console.log(userExists);

        // If password is related to the email console log a successful login
        if (userExists && verifyJWT(jwt)) {
            res.status(200);
        } else {
            return res.status(400).json({
                msg: "Logout failed"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err });
    }
});

// Login an existing user
router.post('/loginUser', async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate if user exists in our database
        const userExists = await getUserExists(email, "email");
        console.log(userExists);

        // If password is related to the email console log a successful login
        if (userExists && await (bcrypt.compare(password, userExists.password))) {
            const token = createJWT(userExists.id, userExists.email);
            
            const data = {
                user: {
                    id: userExists.id,
                    firstName: userExists.firstName,
                    lastName: userExists.lastName,
                    email: userExists.email,
                    username: userExists.username,
                    bio: userExists.bio,
                    profilePicture: userExists.profilePicture,
                    // tracks: userExists.tracks,
                    // playlists: userExists.playlists,
                    // likes: userExists.likes
                },
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
                // dob: true,
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
        const userID = req.query.userID;
        const userExists = await getUserExists(userID, "id");

        if (!userExists) {
            return res.status(400).json({
                msg: "User does not exist"
            });
        }
        else {
            const getUser = await prisma.User.findUnique({
                where: {
                  id: userID,
                },
            });
            console.log("userExists", userExists);
            return res.status(200).json(getUser);
        } 
    } catch (err) {
        console.log(err);
        res.status(500).send({msg:err});
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
        const { id, firstName, lastName, email, username, bio, token, tracks, playlists, likes} = req.body;
        
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
        } 

        // If the only some data is passed, say firstName is not passed, 
        // and we want it to be unchanged, we pass undefined as the value instead.
        const updateUser = await prisma.User.update({
            where: { id },
            data: {
                id: undefined,
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                email: email || undefined,
                bio: bio || undefined,
                username: username || undefined,
                tracks: tracks || undefined,
                playlists: playlists || undefined,
                likes: likes || undefined
            }
        });
        res.status(200).send({msg: "User updated"}); //.send(updateUser);
        
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
                    resetPasswordExpires: new Date(Date.now() + 1400000) // 30 mins exp
                }
            });

            // Set up transporter for email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.EMAIL_ADDRESS}`,
                    // pass: "pdpiipdhdfzzvzfp"
                    pass: `${process.env.APP_PASSWORD}`.toString()
                }
            });

            // DEV Use, later will be checked from .env
            let devDomain = `http://localhost:3000/`;
            let prodDomain = `http://brainbeats.dev/`;

            // Create mailOptions to build the email
            const mailOptions = {
                from: `${process.env.EMAIL_ADDRESS}`,
                to: email,
                subject: 'Forgot Password - BrainBeats',
                text:
                    'Hi ' + `${updateUser.username}` + ', \n\n You are receiving this email beacuse you (or someone else) have requested to reset your password for your BrainBeats account. \n\n'
                    + 'Please click the following link, or paste this into your browser to complete the process within one hour of receiving it: \n\n'
                    + devDomain // TODO Change back to prodDomain
                    + `reset-password?token=${token} \n\n`
                    + 'Your reset link will remain valid for 30 minutes.\n\n'
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

// Confirms reset of a password from an email by verifying token integrity, then updates that users password
router.put('/reset', async (req, res) => {
    try {
        const {
            resetPasswordToken,
            newPassword
         } = req.body;

        // Check if the token is expired
        let tok = await getIsTokenExpired(resetPasswordToken);

        if (tok) {
            return res.status(400).send({
                msg: "Password reset link is expired."
            });
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(newPassword, 10);

        // Select the user by reset token and update their password
        const user = await prisma.User.update({
            where: { resetPasswordToken },
            // resetPasswordExpires: {
            //     $gt: Date.now(),
            // },
            data: {
                password: encryptedPassword,
                resetPasswordExpires: null,
                resetPasswordToken: null
            }
        });

        res.status(200).send({msg: "Password was successfully changed"});
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err });
    }
});
module.exports = router;