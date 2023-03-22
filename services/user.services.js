const User = require(`../models/User.model`)

module.exports.signUpService = async(userInfo) => {
    const user = await User.create(userInfo);
    return user;
}

module.exports.findUserByEmailService = async(email) => {
    return await User.findOne({email});
}