const { Router } = require('express');
const router = Router();
const express = require('express');
router.use(express.json());
const { addReview } = require('../controllers/postReviews');

const routePostReview = async (req, res) => {
    const { adminId, userId, reservationId, roomId, stars, comment } = req.body
    try {
        const postReviews = await  addReview(req.body)
        return res.status(200).send(postReviews)
        
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
};

module.exports = {
    routePostReview
};