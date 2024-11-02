const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

exports.get_image = asyncHandler(async (req, res) => {
   const { filename } = req.params; 
   const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

   const downloadStream = bucket.openDownloadStreamByName(filename);

   downloadStream.on('error', (error) => {
      console.error('Error downloading file:', error);
      res.status(404).send("Image not found");
   });

   downloadStream.on('file', (file) => {
      res.setHeader('Content-Type', file.contentType || 'image/jpeg');
   });

   downloadStream.pipe(res);
});
