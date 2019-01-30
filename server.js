const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} - ${req.method} - ${req.url}`;

  fs.appendFile('server.log', log + '\n',(err)=>{
    if (err){
      console.log('Unable to append to server.log.');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page'
//   });
// });

app.use(express.static(__dirname + '/public'));

// this is helper fuction returning the current year
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res)=>{
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    name: 'Jack',
    welcomeMessage: 'Hello, how are you ',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Project Page',
  });
});

// Bad -- send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


app.listen(port, ()=>{
  console.log(`Server is up at: ${port}`);
});
