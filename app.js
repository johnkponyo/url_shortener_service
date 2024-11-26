//Imports and variables
const express = require('express');
const app = express();
const PORT = 3000;

// Importing the controllers
const urlController = require('./controllers/urlController');

// Setting the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  // Serve static files (CSS, JS, etc.)

// Routes
app.get('/', urlController.renderHomepage);
app.post('/shorten', urlController.shortenUrl);
app.get('/:shortCode', urlController.redirectToUrl);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
