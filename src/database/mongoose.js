const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch((err) => {
    console.log("Connection to database Failed ", err);
  });
