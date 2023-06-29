const express = require("express");
const { getAllChapters, postChapter, getChapterById } = require("../controller/chapterCon");



const router = express.Router();

router.get("/allchapter",getAllChapters)
router.post("/postchapter",postChapter)
router.get("/getchapter/:id",getChapterById)




module.exports= router;
