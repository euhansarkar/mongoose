const express = require(`express`);
const cors = require(`cors`);
const app = express();

// middlewires 
app.use(express.json())
app.use(cors())


app.get(`/`, (req, res) => {
    res.send(`Route is Working`.red.bold);
})

module.exports = app;