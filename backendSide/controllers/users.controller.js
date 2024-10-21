const User = require('../models/users.model');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');

/* Create user account*/
exports.register = asyncHandler(async (req, res, next) => {
   const existingUser = await User.findOne({ email: req.body.email });

   if (existingUser) {
      return res.status(400).json({
         message: 'E-mail already exists'
      });
   }

   try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      const user = new User({
         _id: new mongoose.Types.ObjectId(),
         full_name: req.body.full_name,
         email: req.body.email,
         password: hash,
      });

      const savedUser = await user.save();

      return res.status(201).json({
         message: "User created"
      });
   }
   catch (error) {
      return res.status(500).json({
         error: error.message
      });
   }
});

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
   const roles = foundUser.role.filter(Boolean);

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

   // Send response with tokens
   res.status(200).json({
      message: 'Authentication successful.',
      accessToken: accessToken,
      refreshToken: refreshToken
   });
});
