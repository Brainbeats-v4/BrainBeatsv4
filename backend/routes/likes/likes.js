require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");
const { getJWT, verifyJWT } = require("../../utils/jwt");
const { getUserExists, getPostExists, getLikeExists } = require("../../utils/database");

// Create a user like
router.post('/createUserLike', async (req, res) => {
    try {
        const { userID, postID, token } = req.body;

        const decoded = verifyJWT(token);

        if (!decoded) {
            return res.status(400).json({
                msg: "Invalid token"
            });
        }

        const userExists = await getUserExists(userID, "id");

        const postExists = await getPostExists(postID, "id");

        if (!userExists) {
            return res.status(400).json({
                msg: "User not found"
            });
        } else if (!postExists) { 
            return res.status(400).json({
                msg: "Post not found"
            });
        } else {
            const likeExists = await getLikeExists(postID, userID);

            if (likeExists) {
                return res.status(400).json({
                    msg: "Like already exists"
                });
            }

            // Create a like
            const newLike = await prisma.Like.create({
                data: {
                    userID: userID,
                    postID: postID
                }
            });

            const updatePost = await prisma.Post.update({
                where: { id: postID },
                data: {
                    likeCount: postExists.likeCount + 1
                }
            });

            res.json(newLike);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: err });
    }
});

// Remove a user like
router.delete('/removeUserLike', async (req, res) => { 
    try {

        const { userID, postID, token } = req.body;

        const decoded = verifyJWT(token);

        if (!decoded) {
            return res.status(400).json({
                msg: "Invalid token"
            });
        }

        const userExists = await getUserExists(userID, "id");

        const postExists = await getPostExists(postID, "id");

        if (!userExists) {
            return res.status(400).json({
                msg: "User not found"
            });
        } else if (!postExists) { 
            return res.status(400).json({
                msg: "Post not found"
            });
        } else {
            const deleteLike = await prisma.Like.delete({
                where: { 
                    postID_userID: {
                        postID: postID,
                        userID: userID,
                    },
                }
            });

            if (!deleteLike) {
                return res.status(400).json({
                    msg: "Like not found"
                });
            }
    
            const updatePost = await prisma.Post.update({
                where: { id: postID },
                data: {
                    likeCount: postExists.likeCount - 1
                }
            });
    
            res.status(200).send({ msg: "Deleted a user like" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Get user like status
router.get('/getUserLike', async (req, res) => {
    try {
        const likeStatus = await prisma.Like.findUnique({
            where: {
                postID_userID: {
                    postID: req.query.postID,
                    userID: req.query.userID,
                },
            }
        });

        res.json(likeStatus);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Get all user likes
router.get('/getAllUserLikes', async (req, res) => {
    try {
        const allLikes = await prisma.Like.findMany({
            where: { userID: req.query.userID }
        });

        res.json(allLikes);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;