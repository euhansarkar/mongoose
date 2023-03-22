const jwt = require(`jsonwebtoken`);

const generateToken = (userInfo) => {
    const payLoad = {
        email: userInfo.email,
        role: userInfo.role,
    }

    const token = jwt.sign(payLoad, process.env.TOKEN_SECRET, {
        expiresIn: `20`,
    })

    return token;
}

module.exports = generateToken;