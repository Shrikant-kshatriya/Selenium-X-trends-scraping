require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db.js");
const { getTrend, getAllTrends } = require("./controllers/trendController.js");

const app = express();
// connect to db
db();

app.use(cors());

app.get('/api/trend', getTrend);
app.get('/api/all-trends', getAllTrends);

app.listen(3000, () => {
    console.log("Server is running on port ", 3000);
});
