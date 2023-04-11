const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        backImage: { type: String },
        text1: { type: String },
        text2: { type: String },
        text3: { type: String },
        socialIconOne: {
            image: { type: String },
            link: { type: String },
        },
        socialIconTwo: {
            image: { type: String },
            link: { type: String },
        },
        socialIconThree: {
            image: { type: String },
            link: { type: String },
        },
    },
    { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
