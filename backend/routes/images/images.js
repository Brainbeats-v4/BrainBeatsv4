require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");
const { getJWT, verifyJWT} = require("../../utils/jwt");
const { getUserExists, getPostExists } = require("../../utils/database");

router.put('/updateUserProfilePic', async (req, res) => {
    try{
        const { id, token, profilePicture } = req.body;
        
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
                    profilePicture
                }
            });
            console.log(updateUser)
            res.status(200).send({updateUser});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;