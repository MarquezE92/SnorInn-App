const mongoose = require('mongoose');
const { roomSchema } = require('../db');
const cloudinary = require('../helpers/couldinary');

const putRoom = async (id, body) => {
  const room = await roomSchema.findById(id);

    if (body.photos !== '') {
      const imgId = room.photos.public_id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
        const result = await cloudinary.uploader.upload(body.photos, {
          folder: 'rooms'
      });
      body.photos = {
        public_id: result.public_id,
        url: result.secure_url,
      }
      }
    }
    
    const {modificatedRoom} = await roomSchema.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );
    
    return modificatedRoom

}

module.exports = { putRoom };