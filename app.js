const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogsRoutes = require('./routes/blogRoutes');



const app = express();

// connect to database
const dbURI = 'mongodb+srv://mihai:test1234@nodetutorial.eqipb.mongodb.net/NodeTutorial?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then( (result) => { app.listen(3000)})
    .catch( (err) => { console.log(err) });

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    res.render('about', { title : 'About'});
});

// blog routes

app.use('/blogs',blogsRoutes);

app.use( (req, res) => {
    res.status(404).render('404', { title : '404'});
});