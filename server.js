const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const LeadRouter = require("./routers/leadRouter");
const ContentRouter = require("./routers/contentRouter");
const UsersRouter = require("./routers/userRouter");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB!");
    });

app.use("/api/v1/leads", LeadRouter);
app.use("/api/v1/content", ContentRouter);
app.use("/api/v1/users", UsersRouter);

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
