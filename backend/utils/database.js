const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

// Gets whether a user exists or not based on the field leading the query.
async function getUserExists(searchVal, searchType) {
    let result;
    switch (searchType) {
        case 'email':
            result = await prisma.User.findUnique({
                where: { email: searchVal }
            });
            break;
        case 'id':
            result = await prisma.User.findUnique({
                where: { id: searchVal }
            });
            break;
        case 'username':
            result = await prisma.User.findUnique({
                where: { username: searchVal }
            });
            break;
    }

    if (!result) result = false;
    return result;
}

// Gets whether a post exists or not based on the field leading the query.
async function getPostExists(searchVal, searchType) {
    let result;
    switch (searchType) {
        case 'id':
            result = await prisma.Post.findUnique({
                where: { id: searchVal }
            });

            break;
    }

    if (!result) result = false;
    return result;
}

// Gets whether a playlist exists or not based on the field leading the query.
async function getPlaylistExists(searchVal, searchType) {
    let result;
    switch (searchType) {
        case 'id':
            result = await prisma.Playlist.findUnique({
                where: { id: searchVal }
            });

            break;
    }

    if (!result) result = false;
    return result;
}

async function getLikeExists(postID, userID) {
    let result = await prisma.Like.findUnique({
        where: {
            postID_userID:{
                postID: postID,
                userID: userID
            }
        }
    });

    if (!result) result = false;
    return result;
}

module.exports = {
    getUserExists: getUserExists,
    getPostExists: getPostExists,
    getPlaylistExists: getPlaylistExists,
    getLikeExists: getLikeExists
}