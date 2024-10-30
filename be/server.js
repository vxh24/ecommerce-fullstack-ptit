require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./src/config/dbConnect");
const apiRoutes = require("./src/routes/api");
const { notFound, errorHandler } = require("./src/middlewares/errorHandler");
const fileUpload = require("express-fileupload");
const configViewEngine = require("./src/config/viewEngine");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(morgan("dev"));

app.use(cookieParser());

//config file upload
app.use(fileUpload());

//config req.body
app.use(bodyParser.json()); // for json
app.use(bodyParser.urlencoded({ extended: true })); // for form data

//config template engine
configViewEngine(app);

//declare router
app.use("/v1/api/", apiRoutes);

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
