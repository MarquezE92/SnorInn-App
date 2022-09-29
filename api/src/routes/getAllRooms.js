const { Router }= require('express');
const router = Router();

router.get('/allRooms', getAllRooms)

module.exports = router;
