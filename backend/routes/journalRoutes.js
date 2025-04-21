// Created by Judith Kurian (B00940475)

const express = require('express');

const { createPost, getAllPosts, getCurrentMonthPosts } = require('../controllers/journalController');

const router = express.Router();

router.post('/create-post', createPost);
router.post('/all-posts', getAllPosts);
router.post('/month-posts', getCurrentMonthPosts);

module.exports = router;
