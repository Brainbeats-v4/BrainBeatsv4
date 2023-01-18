const jwt = require('jsonwebtoken');
const { getUserExists } = require('./database');
require("dotenv");

// Checks the local storage for an existing token and logs them in if one exists
function verifyJWT(jwtToken) {
    let token;

    if (jwtToken) {
        token = jwtToken;
    } else {
        return false;
    }

    return jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
            return false;
        } else {
            if (decoded) {
                const userExists = getUserExists(decoded.id, "id");

                if (!userExists) return false;

                return decoded;
            }
        }
    });
}

// Creates and saves a JWT onto their machine's local storage
function createJWT(id, email) {
    try {
        const token = jwt.sign({
            id: id,
            email: email
        }, process.env.JWT_KEY, {
            expiresIn: '30d'
        });

        // Temporarily not saving
        // saveJWT(token);

        console.log("token: " + token);
        return token;
    } catch (err) {
        console.log('error creating jwt\n');
        console.log(err);
    }
}


module.exports = {
    verifyJWT: verifyJWT,
    createJWT: createJWT,
}
