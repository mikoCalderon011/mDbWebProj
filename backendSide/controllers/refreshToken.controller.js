const User = require('../models/users.model');
const jwt = require('jsonwebtoken');

const handle_refresh_token = async (req, res) => {
   const cookies = req.cookies;
   if (!cookies?.jwt) return res.sendStatus(401);
   const refreshToken = cookies.jwt;

   const foundUser = await User.findOne({ refreshToken }).exec();
   if (!foundUser) return res.sendStatus(403); //Forbidden 
   // evaluate jwt 
   jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
         if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
         const roles = Object.values(foundUser.role);
         const accessToken = jwt.sign(
            {
               "email": decoded.email,
               "role": roles
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
         );
         res.json({ roles, accessToken })
      }
   );
}

module.exports = { handle_refresh_token }