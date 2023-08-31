// Express, Cors, & Path
const express = require('express');
const cors = require('cors');
const connection = require('./db'); //Import from db.js
const path = require('path');

// Porting
const app = express();
console.log("process.env.PORT:", process.env.PORT);
const PORT = process.env.PORT || 3000;

// Setup App
app.use(cors());
app.use(express.json());

app.use("/", express.static("../frontend/build"));

// Setup main routes for API
const mainRoutes = require("./routes/mainRoutes");
app.use("/api", mainRoutes);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


// App listening server running at which PORT
app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});