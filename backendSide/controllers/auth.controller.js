const User = require('../models/users.model');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');

/* Handle user log in POST */
exports.log_in = asyncHandler(async (req, res, next) => {
   const { email, password } = req.body;

   // Check for missing email or password
   if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
   }

   // Find user by email
   const foundUser = await User.findOne({ email }).exec();
   if (!foundUser) {
      return res.status(401).json({ message: 'Invalid email or password.' });
   }

   // Compare provided password with stored hash
   const match = await bcrypt.compare(password, foundUser.password);
   if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' });
   }

   // Filter out any falsy values in roles
   const roles = foundUser.roles.filter(Boolean);

   // Generate Access Token
   const accessToken = jwt.sign(
      {
         email: foundUser.email,
         roles: roles,
         userId: foundUser._id
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
   );

   // Generate Refresh Token
   const refreshToken = jwt.sign(
      {
         email: foundUser.email,
         roles: roles,
         userId: foundUser._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
   );

   // Save refresh token with the user
   foundUser.refreshToken = refreshToken;
   await foundUser.save();
   res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

   // Send response with tokens
   res.status(200).json({
      message: 'Authentication successful.',
      accessToken: accessToken,
      refreshToken: refreshToken
   });
});
