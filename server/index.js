const express = require('express');
const app = express();
const PORT = 3000;

// Have Express serve static files such as CSS
app.use(express.static('public'));

// Use EJS templates to render pages
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs', {variable: " working!"});
});

app.listen(PORT, () => {
  console.log("Express server running on port " + PORT);
})
