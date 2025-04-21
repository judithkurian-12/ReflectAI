// Created by Judith Kurian (B00940475)

const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const journalRoutes = require('./journalRoutes');

router.use('/users', userRoutes);
router.use('/journals', journalRoutes);

module.exports = router;
