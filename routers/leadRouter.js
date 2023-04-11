const express = require("express");
const router = express.Router();
const Lead = require("../models/leads");
const verifyTokenAndAdmin = require("../middlewares/authToken");

router.get("/all-leads", verifyTokenAndAdmin, async (req, res) => {
    const allLeads = await Lead.find();
    res.send(allLeads);
});

router.post("/create-leads", async (req, res) => {
    const { name, contact_no } = req.body;

    if (name === undefined || contact_no === undefined) {
        return res.status(400).send("Bad Request");
    }

    const newLead = {
        name: name,
        contact_no: contact_no,
    };

    await Lead.create(newLead);
    res.send("Lead Created Successfully");
});

module.exports = router;
