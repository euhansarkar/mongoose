const mongoose = require(`mongoose`);
const dotenv = require(`dotenv`);
const colors = require(`colors`);
dotenv.config();

const app = require(`./index`);

// database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`database connection successful`.green.bold);
  })
  .catch((err) => {
    console.log(err);
  });

  


// server 
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app is running on port ${port}`.yellow.bold)
})
