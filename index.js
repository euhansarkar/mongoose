const express = require(`express`);
const cors = require(`cors`);
const app = express();

// routers
const productRoutes = require(`./routers/Product.router`);

// middlewires
app.use(express.json());
app.use(cors());

app.get(`/`, (req, res) => {
  res.send(`Route is Working`.red.bold);
});

app.use(`/api/v1/product`, productRoutes);

module.exports = app;
