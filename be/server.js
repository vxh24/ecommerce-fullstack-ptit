require("dotenv").config();
const express = require("express");
const connection = require("./config/dbConnect");
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT || 4000;

//config req.body
app.use(bodyParser.json()); // for json
app.use(bodyParser.urlencoded({ extended: false }));

//declare router
app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);

//self running
(async () => {
  try {
    //using mongoose
    await connection();

    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();
