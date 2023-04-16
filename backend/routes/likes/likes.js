require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");
const { getJWT, verifyJWT } = require("../../utils/jwt");
const { getUserExists, getTrackExists, getLikeExists } = require("../../utils/database");

// Create a user like
router.post('/createUserLike', async (req, res) => {
    try {
        const { trackID, userID, token } = req.body;

        const decoded = verifyJWT(token);

        if (!decoded) {
            return res.status(401).json({
                msg: "Invalid token"
            });
        }

        const userExists = await getUserExists(userID, "id");

        const trackExists = await getTrackExists(trackID, "id");

        if (!userExists) {
            return res.status(404).json({
                msg: "User not found"
            });
        } else if (!trackExists) { 
            return res.status(404).json({
                msg: "Post not found"
            });
        } else {
            const likeExists = await getLikeExists(trackID, userID);

            if (likeExists) {
                return res.status(409).json({
                    msg: "Like already exists"
                });
            }

            // Create a like
            const newLike = await prisma.Like.create({
                data: { userID, trackID }
            });

            const updatePost = await prisma.Track.update({
                where: { id: trackID },
                data: {
                    likeCount: trackExists.likeCount + 1
                }
            });

            // const newUser = await prisma.User.update({
            //     where: { id: userID },
            //     data: {
            //         likes: [...likeArray, newLike]
            //     }
            // });
            
            res.status(201).json(newLike);
        }
    } catch (err) {
        console.error("from createUserLike: ", err);
        res.status(500).send({ msg: err });
    }
});

// Remove a user like
router.delete('/removeUserLike', async (req, res) => { 
    try {

        const { userID, trackID, token } = req.body;

        const decoded = verifyJWT(token);

        if (!decoded) {
            return res.status(401).json({
                msg: "Invalid token"
            });
        }

        const userExists = await getUserExists(userID, "id");

        const trackExists = await getTrackExists(trackID, "id");

        if (!userExists) {
            return res.status(404).json({
                msg: "User not found"
            });
        } else if (!trackExists) { 
            return res.status(404).json({
                msg: "Post not found"
            });
        } else {
            const deleteLike = await prisma.Like.delete({
                where: { 
                    trackID_userID: {
                        trackID: trackID,
                        userID: userID,
                    },
                }
            });

            if (!deleteLike) {
                return res.status(404).json({
                    msg: "Like not found"
                });
            }
    
            const updatePost = await prisma.Track.update({
                where: { id: trackID },
                data: {
                    likeCount: trackExists.likeCount - 1
                }
            });
    
            res.status(200).send({ msg: "Deleted a user like" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Get user like status
router.get('/getUserLike', async (req, res) => {
    try {
        const likeStatus = await prisma.Like.findUnique({
            where: {
                trackID_userID: {
                    trackID: req.query.trackID,
                    userID: req.query.userID,
                },
            }
        });
        
        if (likeStatus == null) res.status(400);
        else res.status(200);

        // console.log("Like Status: " + likeStatus);
        console.log("Status Code: " + res.statusCode);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Get all user likes
router.get('/getAllUserLikes', async (req, res) => {
    try {
        const allLikes = await prisma.Like.findMany({
            where: { userID: req.query.userID },
            // data: {
            //     public: true
            // }
        });
        console.log(allLikes);
        res.status(200).json(allLikes);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;