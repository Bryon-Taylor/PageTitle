const express = require('express');
const bodyParser = require('body-parser');
const got = require('got');
const https = require('https');

const app = express();
const PORT = 3000;

let url = "";
let title = ""
const urls = [];

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

  (async () => {
    try {
      const offset = 7; // number of chars in <title>
      const maxTitleLength = 100;
      const response = await got(url);

      let sourceCode = response.body;
      const beginIndex = sourceCode.search(/<title>/) + offset;

      // shorten search string for efficiency
      let shortSourceCode = sourceCode.substring(beginIndex, (beginIndex + maxTitleLength));

      const endIndex = shortSourceCode.search(/<\/title>/);
      title = await shortSourceCode.substring(0, endIndex);

      urls.push({url: url, title: title});
      res.render('index.ejs', {url: url, title: title, urls: urls});
    } catch (error) {
      console.log(error.response);
    }
  })();


});

app.listen(PORT, () => {
  console.log("Express server running on port " + PORT);
})
