// Created by Judith Kurian (B00940475)

const express = require('express');

const { createUser, loginUser, updateUser, updateMood } = require('../controllers/userController'); 

const router = express.Router();

router.post('/add-user', createUser);
router.post('/update', updateUser);
router.post('/login', loginUser);
router.post('/update-mood', updateMood);

module.exports = router;
