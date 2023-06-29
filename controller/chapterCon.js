const Chapter = require("../models/chapter");



// GET all chapters
exports.getAllChapters = async (req, res) => {
    try {
      const chapters = await Chapter.find();
      res.json(chapters);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // POST a new chapter
exports.postChapter = async (req, res) => {
    try {
      const {id, subject, chapterTitle, content, videoUrl, quiz } = req.body;
  
      const newChapter = new Chapter({
        id,
        subject,
        chapterTitle,
        content,
        videoUrl,
        quiz,
      });
  
      const savedChapter = await newChapter.save();
      res.status(201).json(savedChapter);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };


  // GET a specific chapter by ID
exports.getChapterById =  async (req, res) => {

    try {
      const chapter = await Chapter.findOne({ id: req.params.id }).lean().exec();
      if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
      }
      res.json(chapter);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };