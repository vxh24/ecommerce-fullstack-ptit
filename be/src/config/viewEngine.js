const path = require("path"); //commonjs
const express = require("express");

const configViewEngine = (app) => {
  //config static files: images/css/js
  app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewEngine;
