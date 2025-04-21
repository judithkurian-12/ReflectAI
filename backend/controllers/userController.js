
// Created by Judith Kurian (B00940475)

const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const { name, email, password, gender, country, ageGroup, height, weight, mood, music } = req.body;
    
    // Ensure all fields are provided
    if (!name || !email || !password || mood.length === 0) {
      return res.status(400).json({ error: "Mandatory fields are missing: name, email, password or mood." });
    }

    // Encrypting the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, hashedPassword, gender, country, ageGroup, height, weight, mood, music });
    await newUser.save();

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { userId, name, gender, country, ageGroup, height, weight } = req.body;

  try {
    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user fields if provided
    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (country) user.country = country;
    if (ageGroup) user.ageGroup = ageGroup;
    if (height) user.height = height;
    if (weight) user.weight = weight;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMood = async (req, res) => {
  const { userId, mood } = req.body;

  try {
    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user fields if provided
    if (mood.length>0) user.mood = mood;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // // Generate JWT token
    // const token = jwt.sign(
    //   { id: user._id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' }
    // );

    // res.status(200).json({ message: 'Login successful', token, user });
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser, updateUser, updateMood };
