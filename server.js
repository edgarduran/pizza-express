const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'));
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);
app.locals.pizzas = {};
app.locals.title = 'Pizza Express';

app.get('/', (request, response) => {
  response.render('pages/index');
});

app.get('/pizzas/:id', (request, response) => {
  var pizza = app.locals.pizzas[request.params.id];
  response.render('pages/pizza', { pizza: pizza })
});

app.post('/pizzas', (request, response) => {
  var id = generateId();
  app.locals.pizzas[id] = request.body;
  response.sendStatus(201);
});

if (!module.parent){
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
