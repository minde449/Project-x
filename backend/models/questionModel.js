const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    answers: [
      {
        text: String,
        author: String,
      },
    ],

    id: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
