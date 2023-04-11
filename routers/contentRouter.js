const express = require("express");
const router = express.Router();
const homeContent = require("../models/homeContent");
const { v4: uuidv4 } = require("uuid");
const verifyTokenAndAdmin = require("../middlewares/authToken");

router.get("/", async (req, res) => {
    const data = await homeContent.find();
    res.send(data);
});

router.post("/add-content", verifyTokenAndAdmin, async (req, res) => {
    const newContent = req.body;
    const id = uuidv4();
    newContent.id = id;
    await homeContent.create(newContent);
    res.send("Added content with id " + id);
});

router.put("/update-content", verifyTokenAndAdmin, async (req, res) => {
    const newContent = req.body;
    await homeContent.findOneAndReplace({ id: newContent.id }, newContent);
    res.send("updated content");
});

module.exports = router;
