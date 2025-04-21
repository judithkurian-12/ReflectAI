// Created by Judith Kurian (B00940475)

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  country: { type: String },
  gender: { type: String },
  ageGroup: { type: String },
  height: { type: Number },
  weight: { type: Number },
  mood: { type: [String], required: true },
  music: { type: [String]},
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
