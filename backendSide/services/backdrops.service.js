const Movie = require('../models/movies.model');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { Readable } = require('stream');
const { v4: uuidv4 } = require('uuid');

exports.add_backdrop = asyncHandler(async (movieId, file) => {
   const movie = await Movie.findById(movieId);
   if (!movie) throw new Error("Movie not found");

   if (!file) throw new Error("No image provided");

   const allowedFormats = ['image/jpeg', 'image/png'];
   if (!allowedFormats.includes(file.mimetype)) {
      throw new Error("Invalid file format. Only JPEG and PNG are allowed.");
   }

   const { width, height } = await sharp(file.buffer).metadata();

   const minWidth = 1920;
   const minHeight = 1080;
   const maxWidth = 3840;
   const maxHeight = 2160;

   if (width < minWidth || height < minHeight || width > maxWidth || height > maxHeight) {
      throw new Error(`Image dimensions are out of range. Must be between ${minWidth}x${minHeight} and ${maxWidth}x${maxHeight}.`);
   }

   const originalFilename = file.originalname; 
   const fileExtension = originalFilename.split('.').pop();
   const imageUUID = uuidv4() + '.' + fileExtension;
   
   const processedImage = await sharp(file.buffer)
      .resize({ width: 1920, height: 1080, fit: 'contain' })
      .jpeg({ quality: 80 })
      .toBuffer();

   const readBufferStream = Readable.from(processedImage);
   const uploadStream = new mongoose.mongo.GridFSBucket(mongoose.connection.db).openUploadStream(imageUUID);

   // Using a promise to handle the upload process
   await new Promise((resolve, reject) => {
      readBufferStream.pipe(uploadStream);

      uploadStream.on('error', (error) => {
         console.error('Error uploading file:', error);
         reject(new Error("Failed to upload file"));
      });

      uploadStream.on('finish', resolve); 
   });

   console.log('Processed image uploaded successfully');

   const backdrop = {
      file_path: imageUUID,
      aspect_ratio: width / height,
      height: 1080,
      width: 1920,
   };

   console.log(backdrop);

   movie.images.backdrops.push(backdrop);
   await movie.save();

   return backdrop;
});
