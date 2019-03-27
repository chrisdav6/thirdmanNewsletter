const express = require("express");
const app = express();
const path = require("path");
const request = require("express");
const helmet = require("helmet");
const port = process.env.PORT || 3000;

//----- SETUP ------//

//Use Helmet
app.use(helmet());

//SetUp Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Parse Body
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//----- ROUTES ------//

//Index - GET
app.get("/", function(req, res) {
  res.sendFile("index.html");
});

//----- SERVER ------//

//Start Server
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});