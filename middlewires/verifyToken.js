const jwt = require(`jsonwebtoken`);
const { promisify } = require(`util`);
/**
 *
 * @param {check if token exist} req
 * @param {if not token send response} res
 * @param {if token true decode the token} next
 * @param {if valid then next} next
 */

module.exports = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(` `)[1];
    if (!token) {
      return res.status(401).json({
        status: `failed`,
        message: `you are not logged in`,
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    // অনেক সময় ডিকোডেড হওয়া মেইল থেকে আমরা ইউজারকে গেট করে এনে রেসপন্স সেন্ড করতে পারি।
    
    // const user = await User.findOne({email: decoded.email});
    // req.user = user;

    req.user = decoded;

    next();

  } catch (error) {
    res.status(403).json({
        status: `failed`,
        error: `invalid token`
    })
  }
};
