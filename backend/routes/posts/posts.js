require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { user, post } = new PrismaClient();
// const { JSON } = require("express");
const { getJWT, verifyJWT} = require("../../utils/jwt");
const { getUserExists, getPostExists } = require("../../utils/database");

// Create a post
router.post('/createPost', async (req, res) => {
    try {
        const { userID, title, bpm, key, midi, instruments, noteTypes, token, thumbnail, likeCount} = req.body;
        const decoded = verifyJWT(token);

        if (!decoded) {
            return res.status(401).json({
                msg: "Invalid token"
            });
        }

        const userExists = await getUserExists(userID, "id");
        if (!userExists) {
            return res.status(404).json({
                msg: "User not found"
            });
        } else {
            // Create a single record
            const newPost = await prisma.Post.create({
                data: {
                    user: {
                        connect: {
                            id: userID
                        }
                    },
                    title: title,
                    bpm: bpm,
                    key: key,
                    instruments: instruments,
                    noteTypes: noteTypes,
                    thumbnail: thumbnail,
                    midi: midi,
                    likeCount: likeCount,
                    public: true,
                }
            });

          return res.status(201).json(newPost);
        }
    } catch (err) {
        console.log(err);
      return res.status(500).send({ msg: err });
    }
});

// Get all posts based on a username
router.get('/getUserPostsByUsername', async (req, res) => {
    try {
        const username = req.query.username;
        if (username === "") {
            const allPosts = await prisma.Post.findMany({
                include: {user : true}
            });

            return res.json(allPosts);
            return;
        }

        const userExists = await getUserExists(username, "username");

        if (!userExists) {
            return res.status(404).json({
                msg: "Username not found"
            });
        } else {
            // Find the records
            const userPosts = await prisma.Post.findMany({
                where: { userID: userExists.id },
                include: {user: true}
            });

            if (!userPosts) {
                return res.status(404).json({
                    msg: "Posts not found"
                });
            }
            
            return res.status(200).json(userPosts);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: err });
    }
});

// Get all posts based on a title
router.get('/getPostsByTitle', async (req, res) => {
    try {
        const title = req.query.title;
        if (title === "") {
            const allPosts = await prisma.Post.findMany({
                include: {user : true}
            });

            return res.json(allPosts);
            return;
        }
        
        // Find the records
        const posts = await prisma.Post.findMany({
            where: { title: 
                {
                    contains: title 
                },
            },
            include: {user: true}
        });

        if (!posts) {
            return res.status(404).json({
                msg: "Posts not found"
            });
        }

        return res.status(200).json(posts);
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: err });
    }
});

// Get all posts based on a user ID
router.get('/getUserPostsByID', async (req, res) => {
    try {
        const userID = req.query.userID;

        console.log("Requested id: ", userID);
        const userExists = await getUserExists(userID, "id");
        if (!userExists) {
            return res.status(404).json({
                msg: "User not found"
            });
        } else {
            const userPosts = await prisma.Post.findMany({
                where: { userID: req.query.userID },
                include: {user: true}
            });

            if (!userPosts) {
                return res.status(404).json({
                    msg: "User ID not found"
                });
            }

            return res.status(200).json(userPosts);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: err });
    }
});

// Get all posts
router.get('/getAllPosts', async (req, res) => {
    try {
        const posts = await prisma.Post.findMany({
            include: {user: true}
        });

        return res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: err });
    }
});

// Delete a post
router.delete('/deletePost', async (req, res) => {
    try {
        const decoded = verifyJWT(req.body.token);
        console.log("JWT: " + req.body.token);

        if (!decoded) {
            return res.status(401).json({
                msg: "Invalid token"
                });
        }

        await prisma.Post.delete({
            where: { id: req.body.id }
        });

        return res.status(200).send({ msg: "Deleted a user post" });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

router.get('/getPublicPopularPosts', async(req, res) => {
    try {
        const posts = await prisma.Post.findMany({
            where: {
            likeCount: {
                gte: 10,
            },
            public: {
                equals: true
            }
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            },
        })
        return res.status(200).json(posts)
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

// Update user post info 
router.put('/updatePost', async (req, res) => {

    try {
        const { id, title, midi, thumbnail, likeCount, public, token} = req.body;

        const decoded = verifyJWT(token);

        if (!decoded) {
            return res.status(401).json({
                msg: "Invalid token"
            });
        }

        // Check if the id already exists in db
        const postExists = await getPostExists(id, "id");

        if (!postExists) {
            return res.status(404).json({
                msg: "Post not found"
            });
        } else {
            const updatePost = await prisma.Post.update({
                where: { id },
                data: {
                    title: title,
                    likeCount: likeCount,
                    midi: midi,
                    public: public,
                    thumbnail: thumbnail
                }
            });

            return res.status(200).json(updatePost);
      }
    } catch (err) {
        console.log(err);
        return res.status(500).send({msg: err});
    }
});

module.exports = router;