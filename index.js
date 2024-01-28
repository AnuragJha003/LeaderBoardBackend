const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB schema and model
const leaderboardSchema = new mongoose.Schema({
  rank: Number,
  playerName: String,
  score: Number,
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// Routes

// Get top 10 leaderboard details
app.get('/api/leaderboard/top10', async (req, res) => {
  try {
    const top10 = await Leaderboard.find().sort({ score: -1 }).limit(10);
    res.json(top10);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get top 3 leaderboard details
app.get('/api/leaderboard/top3', async (req, res) => {
  try {
    const top3 = await Leaderboard.find().sort({ score: -1 }).limit(3);
    res.json(top3);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
