const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { putRoom } = require('../controllers/putRoomById');

const routePutRoomById = async (req, res) => {
    const getId = req.params.id
    const body = req.body
    try {
        const roomUpdated = await putRoom(getId, body)
        return res.status(200).send(roomUpdated)
    } catch (error) {
        return res.status(404).send({ error: 'We are sorry, we couldnt update the room' })
    }
};

module.exports ={routePutRoomById};