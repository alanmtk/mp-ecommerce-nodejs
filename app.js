const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/detail', (req, res) => {
  res.render('detail', req.query);
});

app.use(express.static('assets'));

app.use('/assets', express.static(`${__dirname}/assets`));

app.listen(process.env.PORT || 3000);
