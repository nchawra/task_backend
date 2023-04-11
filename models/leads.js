const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
    {
        name: { type: String },
        contact_no: { type: Number },
    },
    { timestamps: true }
);

const Lead = mongoose.model("Lead", LeadSchema);
module.exports = Lead;
