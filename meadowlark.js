var express   = require('express');
var exphbs    = require('express-handlebars');

var fortune   = require('./lib/fortune.js');

var app = express();

// set up express4-handlebars view engine
var hbs = exphbs.create({ defaultLayout:'main' });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// root page
app.get('/', function(req, res) {
  res.render('home');
});

// about page
app.get('/about', function(req, res) {
  res.render('about', { fortune: fortune.getFortune() });
});

// 404 catch-all handler (m/ware)
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

// 500 error handler (m/ware)
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:'+
    app.get('port')+'. Press <ctrl>-C to terminate.');
});
