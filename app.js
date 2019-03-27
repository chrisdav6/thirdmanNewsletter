const express = require("express");
const app = express();
const path = require("path");
const request = require("request");
const helmet = require("helmet");
const dotenv = require('dotenv').config();
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

//Index - POST
app.post("/", function(req, res) {

  //Grab Data from form inputs
  let { fname, lname, email } = req.body;

  //Create Data Object and stringify for MailChimp
  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  let jsonData = JSON.stringify(data);

  //Request Options
  let options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/" + process.env.MAIL_LIST,
    method: "POST",
    headers: {
      "Authorization": process.env.MAIL_API
    },
    body: jsonData
  };

  //Send Request to MailChimp
  request(options, function(err, response, body) {
    if(err) {
      res.send(err);
    } else {
      res.send("Success");
    }
  });

});

//----- SERVER ------//

//Start Server
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});

