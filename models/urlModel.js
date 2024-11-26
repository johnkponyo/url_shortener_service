const generateShortCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';
    for (let i = 0; i < 6; i++) {
      shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortCode;
  };
  
  let urlMapping = {};  // Storage for mapping of shortCode -> longUrl
  let recentUrls = [];  // Storage for the last 5 shortened URLs
  
  // Creating a short code for the provided long URL
  exports.createShortCode = (longUrl) => {
    const shortCode = generateShortCode();
    urlMapping[shortCode] = longUrl;
    return shortCode;
  };
  
  // Retrieving the long URL based on the short code
  exports.getLongUrl = (shortCode) => {
    return urlMapping[shortCode];
  };
  
  // Getting the last 5 recently shortened URLs
  exports.getRecentUrls = () => {
    return recentUrls;
  };
  
  // Adding a new URL to the recent lis
  exports.addRecentUrl = (shortCode, longUrl) => {
    recentUrls.unshift({ shortCode, longUrl });
    if (recentUrls.length > 5) {
      recentUrls.pop();
    }
  };
  