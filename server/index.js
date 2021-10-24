const express = require('express');
const bodyParser = require('body-parser');
const got = require('got');

const app = express();
const PORT = 3000;

let url = ""; // User input URL
let title = "" // Website title
const urls = []; // Store website titles and urls

// Have Express serve static files such as CSS
app.use(express.static('public'));

// Allow parsing of body in HTTP requests
app.use(bodyParser.urlencoded({ extended: true }));

// Use EJS templates to render pages
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs', {url: url, title: title, urls: urls});
});

app.post('/', (req, res) => {
  url = req.body.inputUrl;

  // Try to extract website title
  (async () => {
    try {

      // Get the source code of website
      const response = await got(url);
      const sourceCode = response.body;

      // Search source code for title
      const matchedExpression = sourceCode.match(/<title>(.*)<\/title>/);

      // Second element in array is the website title minus the html tags
      const title = matchedExpression[1];
      pushAndRender(res, url, title, urls);
    } catch (error) {
        const title = "Cannot access this website's title";
        pushAndRender(res, url, title, urls);
    }
  })();
});

// Push results to the array and render on page
function pushAndRender(res, url, title, urls) {
  urls.push({url: url, title: title});
  res.render('index.ejs', {url: url, title: title, urls: urls});
}

app.listen(PORT, () => {
  console.log("Express server running on port " + PORT);
})
