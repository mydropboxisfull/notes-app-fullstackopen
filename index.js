const express = require("express"); // require express package
const app = express(); // run express as app

// ----------------------------- PACKAGES ----------------------------------
const cors = require("cors"); 
app.use(cors()); // CORS allows or denies cross-origin requests (allow two diff ports to talk)

require("dotenv").config(); // is used for loading environment variables

var bodyParser = require("body-parser"); // require body-parser package (NEED TO STUDY MORE)
// var urlencodedParser = bodyParser.urlencoded({ extended: false }) // DO NOT NEED - THIS IS FOR URL ENCODED DATA NOT RAW JSON
var jsonParser = bodyParser.json(); // ^^ assigns to jsonParser

const noteModel = require("./backend/models/notes"); // Mongoose schema and model for handling notes ---- Found in notes.js

// ------------------------------------------------------------------------


// testing route
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// get notes route
app.get("/api/notes", (request, response) => {
  noteModel.find({}).then((notes) => {
    console.log("finding notes");
    response.json(notes);
    console.log("notes found!");
  });
});

// create note route
app.post("/api/notes", jsonParser, (request, response) => {
  console.log("here is the log:", request.body);

  const body = request.body;

  if (body.message === undefined) {
    return response.status(400).json({ error: "message content missing" });
  }

  const note = new noteModel({
    message: body.message,
    status: body.status || false,
  });

  console.log("here is the message:", body.message);

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});




// ---------------------------------------------------------------
const PORT = process.env.PORT || 3001; // starts server on designated port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
