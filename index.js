const express = require(`express`);
const cors = require(`cors`);
const app = express();

// routers
const productRoutes = require(`./routers/Product.router`);
const brandRoutes = require(`./routers/brand.router`);
const categoryRoutes = require(`./routers/category.router`)

// middlewires
app.use(express.json());
app.use(cors());

app.get(`/`, (req, res) => {
  res.send(`Route is Working`.red.bold);
});

app.use('/api/v1/product', productRoutes);
app.use(`/api/v1/brand`, brandRoutes)
app.use(`/api/v1/category`, categoryRoutes)

module.exports = app;
