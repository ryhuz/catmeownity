require("dotenv").config();
const express = require("express");
const app = express();


require('./lib/connection');

/* middleware */


/* routes */


app.listen(process.env.PORT, () => {
    console.log(`Connected on ${process.env.PORT}`);
});