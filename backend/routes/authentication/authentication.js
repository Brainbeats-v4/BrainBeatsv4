require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
var nodemailer = require("nodemailer");
const { getJWT, verifyJWT, createJWT, removeJWT } = require("../../utils/jwt");
// const { JSON } = require("express");
const dbUtil = require("../../utils/database");

// TODO Check env for if dev, set url to localhost:3000 else, dev url

router.get('/verifyJWT', async (req, res) => {
    try {
        const jwt = req.query.jwt;
        if (jwt == undefined)
            res.status(400).send("usage: {jwt: string}")

        return res.json(verifyJWT(jwt));
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
}); 

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.APP_PASSWORD,
    },
    secure: true,
});

router.post('/sendVerificationEmail', async (req, res) => {
    try {
        const { email, subject } = req.body;
        const userExists = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        // If the user is an existing user, then send a verification email based on their ID
        if (userExists) {
            const mailData = {
                from: 'brainbeatsucf@gmail.com',
                to: email,
                subject: subject,
                text: 'Verify your login to BrainBeats by clicking the following link, or copy and paste it into your browser: ',
                html: '<a href="http://www.brainbeatz.xyz/verify?id=${userExists.id}">Verify Email</a>',
                // html: `<a href="http://localhost:3000/verify?id=${userExists.id}">Verify Email</a>`,
            };

            transporter.sendMail(mailData, function (err, info) {
                if (err) {
                    console.error(err);
                    throw err;
                } else {
                    console.log(`Email Sent: ${info.response}`);
                    res.status(200).send({ message: "Mail sent", message_id: info.messageId });
                }

            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "User does not exist." });
    }
});


module.exports = router;