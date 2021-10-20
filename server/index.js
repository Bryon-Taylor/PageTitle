const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const urls = [];

// Have Express serve static files such as CSS
app.use(express.static('public'));

// Allow parsing of body in HTTP requests
app.use(bodyParser.urlencoded({ extended: true }));

// Use EJS templates to render pages
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs', {url: "", urls: urls});
});

app.post('/', (req, res) => {
  console.log(req.body.inputUrl);
  urls.push(req.body.inputUrl);
  res.render('index.ejs', {url: req.body.inputUrl, urls: urls});
});

app.listen(PORT, () => {
  console.log("Express server running on port " + PORT);
})
