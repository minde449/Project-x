const Question = require("../models/questionModel");
const mongoose = require("mongoose");

// get all questions
const getQuestions = async (req, res) => {
  const questions = await Question.find({}).sort({ createdAt: -1 });

  res.status(200).json(questions);
};

// get a single question
const getQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such question" });
  }

  const question = await Question.findById(id);

  if (!question) {
    return res.status(404).json({ error: "No such question" });
  }

  res.status(200).json(question);
};

// create new question
const createQuestion = async (req, res) => {
  const { title, description, author } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }

  if (!author) {
    emptyFields.push("author");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const question = await Question.create({ title, description, author });
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a question
const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such question" });
  }

  const question = await Question.findOneAndDelete({ _id: id });

  if (!question) {
    return res.status(400).json({ error: "No such question" });
  }

  res.status(200).json(question);
};

// add answer to the question
const addAnswer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such question" });
  }

  const question = await Question.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        answers: req.body.answers,
      },
    },
    { new: true }
  );

  if (!question) {
    return res.status(400).json({ error: "No such question" });
  }

  res.status(200).json(question);
};

// delete answer
const deleteAnswer = async (req, res) => {
  const { id, answerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such question" });
  }
  await Question.update({ _id: id }, { $pull: { answers: { _id: answerId } } });

  res.status(200).json("Successfully deleted");
};

module.exports = {
  getQuestions,
  getQuestion,
  createQuestion,
  deleteQuestion,
  addAnswer,
  deleteAnswer,
};
