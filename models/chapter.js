const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({

    id: { type: Number, required: true },
    subject: String,
    chapterTitle: String,
    content: String,
    videoUrl: String,
    quiz: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
      },
    ],
  });
  
  const Chapter = mongoose.model('Chapter', chapterSchema);
  module.exports = Chapter