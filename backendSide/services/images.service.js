const Movie = require('../models/movies.model');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { Readable } = require('stream');
const { v4: uuidv4 } = require('uuid');

exports.add_image = asyncHandler(async (movieId, file, type) => {
   const movie = await Movie.findById(movieId);
   if (!movie) throw new Error("Movie not found");

   if (!file) throw new Error("No image provided");

   const allowedFormats = ['image/jpeg', 'image/png'];
   if (!allowedFormats.includes(file.mimetype)) {
      throw new Error("Invalid file format. Only JPEG and PNG are allowed.");
   }

   const { width, height } = await sharp(file.buffer).metadata();

   let minWidth, minHeight, maxWidth, maxHeight;
   if (type === 'backdrop') {
      minWidth = 1920; minHeight = 1080;
      maxWidth = 3840; maxHeight = 2160;
   } 
   else if (type === 'poster') {
      minWidth = 500; minHeight = 750;
      maxWidth = 2000; maxHeight = 3000;
   }

   if (type !== 'logo' && (width < minWidth || height < minHeight || width > maxWidth || height > maxHeight)) {
      throw new Error(`Image dimensions are out of range. Must be between ${minWidth}x${minHeight} and ${maxWidth}x${maxHeight}.`);
   }

   const originalFilename = file.originalname;
   const fileExtension = originalFilename.split('.').pop();
   const imageUUID = uuidv4() + '.' + fileExtension;

   let processedImage;
   if (type === 'backdrop') {
      processedImage = await sharp(file.buffer)
         .resize({ width: 1920, height: 1080, fit: 'contain' })
         .jpeg({ quality: 80 })
         .toBuffer();
   } 
   else if (type === 'poster') {
      processedImage = await sharp(file.buffer)
         .resize({ width: 500, height: 750, fit: 'contain' })
         .jpeg({ quality: 80 })
         .toBuffer();
   } 
   else if (type === 'logo') {
      processedImage = await sharp(file.buffer)
         .jpeg({ quality: 80 })
         .toBuffer();
   }

   const readBufferStream = Readable.from(processedImage);
   const uploadStream = new mongoose.mongo.GridFSBucket(mongoose.connection.db).openUploadStream(imageUUID);

   await new Promise((resolve, reject) => {
      readBufferStream.pipe(uploadStream);
      uploadStream.on('error', (error) => {
         console.error('Error uploading file:', error);
         reject(new Error("Failed to upload file"));
      });
      uploadStream.on('finish', resolve);
   });

   console.log('Processed image uploaded successfully');

   const imageData = {
      file_path: imageUUID,
      aspect_ratio: width / height,
      height: height,
      width: width,
   };

   movie.images[type === 'poster' ? 'posters' : type === 'backdrop' ? 'backdrops' : 'logos'].push(imageData);
   await movie.save();

   return imageData;
});
