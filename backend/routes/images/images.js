require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");
const { getJWT, verifyJWT} = require("../../utils/jwt");
const { getUserExists, getPostExists } = require("../../utils/database");

router.put('/updateUserProfilePic', async (req, res) => {
    try {
        const { id, token, profilePicture } = req.body;
        const decoded = verifyJWT(token);

        if (!decoded) {
            return res.status(401).json({
                msg: "Invalid token"
            });
        }

        const userExists = await getUserExists(id, "id");

        if (!userExists) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        const updateUser = await prisma.User.update({
            where: { id },
            data: { profilePicture }
        });

        return res.status(200).json({updateUser});

    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});

router.put('/updateTrackPic', async (req, res) => {
    try{
        const { id, token, thumbnail } = req.body;
        
        const decoded = verifyJWT(token);
        
        if (!decoded) {
            return res.status(401).json({
                msg: "Invalid token"
            });
        }
                
        // Check if the user already exists in db
        const postExists = await getPostExists(id, "id");

        if (!postExists) {
            return res.status(404).json({
                msg: "Track ID not found"
            });
        } else {
            const updateTrack = await prisma.Post.update({
                where: { id },
                data: {
                    thumbnail
                }
            });
            console.log(updateTrack)
            res.status(200).send({updateUser});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;