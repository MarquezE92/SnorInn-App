const mongoose = require('mongoose');
const { roomSchema } = require('../db');
const cloudinary = require('../helpers/couldinary');

const putRoom = async (id, body) => {
  const room = await roomSchema.findById(id);
  const data = {
    type: body.type,
    name: body.name,
    n_beds: body.n_beds,
    price: body.price,
    services: body.services,
    userAdminId: body.userAdminId,
    place: body.place,
    description: body.description,
    rating: body.rating
  }

    if (body.photos !== '') {
      const imgId = room.photos.public_id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
        const result = await cloudinary.uploader.upload(body.photos, {
          folder: 'rooms'
      });
      data.photos = {
        public_id: result.public_id,
        url: result.secure_url,
      }
      }
    }
    
    const {modificatedRoom} = await roomSchema.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
    
    return modificatedRoom

}

module.exports = { putRoom };