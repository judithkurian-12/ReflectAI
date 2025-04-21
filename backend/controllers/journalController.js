// Created by Judith Kurian (B00940475)

const Journal = require('../models/journalModel');

const createPost = async (req, res) => {
     try {
        const { userId, text, attachments, audioRecordings, mood, createdAt } = req.body;
    
        const newPost = new Journal({ userId, text, attachments, audioRecordings, mood, createdAt });
        await newPost.save();
    
        res.status(201).json({ message: 'Journal created'});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const getAllPosts = async (req,res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Query to find documents matching userId
    const posts = await Journal.find({userId: userId});
    // const posts = await Journal.find({userId: userId});
    if (!posts) {
      return res.status(404).json({ message: 'Posts not found for this user' });
    }
    res.status(200).json(posts); // Send the posts back as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getCurrentMonthPosts = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    // Getting first and last day of the current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const posts = await Journal.find({
      userId,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createPost, getAllPosts, getCurrentMonthPosts };
