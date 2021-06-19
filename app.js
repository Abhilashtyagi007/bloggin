const express = require('express');

const morgan = require('morgan');

const mongoose = require('mongoose');

const { urlencoded } = require('express');

const blogRoutes = require('./routes/blogRoutes');

const port = 3000;



// express app
const app = express();

// connect to mangoDB
const dbURI = 'mongodb+srv://Tyagi:tyagityagi@nodetute.1evii.mongodb.net/nodeblog-db?retryWrite s=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT || port))
    .catch((err) => console.log(err));

 

// register view engine
app.set('view engine','ejs');

// listen for request
//app.listen(3000);

// middleware & static 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));


app.get('/',(req,res) =>{
    res.redirect('/blogs');
})

app.get('/about', (req,res) => {
   res.render('about',{title: 'About'});
})

// blog routes
app.use('/blogs',blogRoutes);

app.use((req,res) =>{
    res.status(404).render('404',{title: '404'});
})