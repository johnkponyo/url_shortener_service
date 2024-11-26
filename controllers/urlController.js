const { validationResult } = require('express-validator');
const urlModel = require('../models/urlModel');  // Importing the model for data handling

// Rendering the homepage with the recent shortened URLs
exports.renderHomepage = (req, res) => {
  res.render('index', { 
    recentUrls: urlModel.getRecentUrls(),
    successMessage: null,
    errors: null
  });
};

// Handling the shortening of a URL
exports.shortenUrl = [
  // URL validation
  require('express-validator').check('longUrl').isURL().withMessage('Please enter a valid URL'),

  // Processing the form submission
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('index', {
        recentUrls: urlModel.getRecentUrls(),
        successMessage: null,
        errors: errors.array()
      });
    }

    const longUrl = req.body.longUrl;
    const shortCode = urlModel.createShortCode(longUrl);

    // Add to the recent list
    urlModel.addRecentUrl(shortCode, longUrl);

    // Render the homepage with the success message
    res.render('index', {
      recentUrls: urlModel.getRecentUrls(),
      successMessage: `Shortened URL: http://localhost:3000/${shortCode}`,
      errors: null
    });
  }
];

// Redirect to the original URL based on short code
exports.redirectToUrl = (req, res) => {
  const shortCode = req.params.shortCode;
  const longUrl = urlModel.getLongUrl(shortCode);

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send('Shortened URL not found');
  }
};
