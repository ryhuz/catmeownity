require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("./lib/passportConfig");

require('./lib/connection');

/* middleware */
app.use(passport.initialize());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

/* routes */
app.use("/public", require("./routes/public.routes"));
app.use("/user", require("./routes/user.routes"));

app.get("*", (req, res) => {
    res.status(404).json({ message: "Server route not found" });
});

app.listen(process.env.PORT, () => {
    console.log(`Connected on ${process.env.PORT}`);
});