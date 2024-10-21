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
