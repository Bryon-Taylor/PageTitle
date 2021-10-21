const express = require('express');
const bodyParser = require('body-parser');
const got = require('got');
const request = require('request');
const app = express();
const PORT = 3000;

let url = "";
let title = ";"
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
  console.log(req.body.inputUrl);
  url = req.body.inputUrl;

  (async () => {
    try {
      const offset = 7; // number of chars in <title>
      const response = await got(url);
      const sourceCode = response.body;
      const beginIndex = sourceCode.search(/<title>/) + offset;
      const endIndex = sourceCode.search(/<\/title>/);
      title = await sourceCode.substring(beginIndex, endIndex);
      console.log(title);
      urls.push({url: url, title: title});
      res.render('index.ejs', {url: url, title: title, urls: urls});
    } catch (error) {
      console.log(error.response.body);
    }
  })();


});

app.listen(PORT, () => {
  console.log("Express server running on port " + PORT);
})
