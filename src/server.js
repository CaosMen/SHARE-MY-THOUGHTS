const dotenv = require('dotenv');
const express = require("express");
const http = require("http");

const app = express();
dotenv.config();

app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}));

var dbConfig = require('./db.js');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then((db) => {console.log("MongoDb connected")})
    .catch(err => console.log(err));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: app,
    noCache: true
});

const routes = require("./routes/index");
app.use("/", routes);

var server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
    console.log(`Server running on Port: ${PORT}`);
});