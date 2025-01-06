require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./src/config/dbConnect");

const authRoute = require("./src/routes/authRoute");
const userRoute = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
const blogRoute = require("./src/routes/blogRoute");
const categoryRoute = require("./src/routes/pCategoryRoute");
const bCategoryRoute = require("./src/routes/bCategoryRoute");
const brandRoute = require("./src/routes/brandRoute");
const couponRoute = require("./src/routes/couponRoute");
const enquiryRoute = require("./src/routes/enquiryRoute");
const orderRoute = require("./src/routes/orderRoute");
const messageRoute = require("./src/routes/messageRoute");

const { notFound, errorHandler } = require("./src/middlewares/errorHandler");
const fileUpload = require("express-fileupload");
const configViewEngine = require("./src/config/viewEngine");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const { initAdminAccount } = require("./src/services/authService");
const { app, server } = require("./src/socket/socket");

const port = process.env.PORT || 4000;

app.use(cors());

app.use(morgan("dev"));

app.use(cookieParser());

//config file upload
app.use(fileUpload());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

//config req.body
app.use(bodyParser.json()); // for json
app.use(bodyParser.urlencoded({ extended: true })); // for form data

//config template engine
configViewEngine(app);

//declare router
app.use("/v1/api/", authRoute);
app.use("/v1/api/user", userRoute);
app.use("/v1/api/product", productRoute);
app.use("/v1/api/blog", blogRoute);
app.use("/v1/api/category", categoryRoute);
app.use("/v1/api/blog-category", bCategoryRoute);
app.use("/v1/api/brand", brandRoute);
app.use("/v1/api/coupon", couponRoute);
app.use("/v1/api/enquiry", enquiryRoute);
app.use("/v1/api/order", orderRoute);
app.use("/v1/api/message", messageRoute);

app.use(notFound);
app.use(errorHandler);

//self running
(async () => {
  try {
    //using mongoose
    await connection();

    server.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
      initAdminAccount();
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();
