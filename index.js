const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();



const app = express();
app.use(bodyParser.json());


app.get("/", async (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT, () => {
    console.log('server started');
});