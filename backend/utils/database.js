const { PrismaClient } = require("@prisma/client");
const { join } = require("@prisma/client/runtime");
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');


// Gets whether a user exists or not based on the field leading the query.
async function getUserExists(searchVal, searchType) {
    if (!searchType) return false;
    if (!searchVal) return false;

    let result;
    switch (searchType) {
        case 'email':
            result = await prisma.User.findUnique({
                where: { email: searchVal },
                select: {
                    email: true,
                    password: true,
                    firstName: true,
                    username: true,
                    lastName: true,
                    bio: true,
                    profilePicture: true,
                    id: true,
                    likes: true,
                    playlists: true,
                    tracks: true,
                }
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

async function getIsTokenExpired(searchVal) {
    let data = await prisma.User.findUnique({
        where: { resetPasswordToken: searchVal },
        select: {
            resetPasswordExpires: true,
        }
    });

    return data == null ? false : data.resetPasswordExpires < Date.now();
}

// Gets whether a post exists or not based on the field leading the query.
async function getTrackExists(searchVal, searchType) {
    let result;
    switch (searchType) {
        case 'id':
            result = await prisma.Track.findUnique({
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
    getTrackExists: getTrackExists,
    getPlaylistExists: getPlaylistExists,
    getLikeExists: getLikeExists,
    getIsTokenExpired: getIsTokenExpired
}