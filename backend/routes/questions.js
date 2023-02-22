const express = require("express");
const {
  createQuestion,
  getQuestions,
  getQuestion,
  deleteQuestion,
  updateQuestion,
  addAnswer,
  deleteAnswer,
} = require("../controllers/questionController");

const router = express.Router();

// GET all questions
router.get("/", getQuestions);

//GET a single question
router.get("/:id", getQuestion);

// POST a new question
router.post("/", createQuestion);

// DELETE a question
router.delete("/:id", deleteQuestion);

// ADD a answer
router.post("/:id/answer", addAnswer);

//Delete answer
router.delete("/:id/answer/:answerId", deleteAnswer);

module.exports = router;
