// Created by Judith Kurian (B00940475)

const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    userId: {type: String},
    text: { type: String},
    attachments: { type: [String]},
    audioRecordings: { type: [String]},
    mood: {type: [String]},
    createdAt: { type: Date}
})

module.exports = mongoose.model('Journal', JournalSchema);
