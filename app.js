var express = require('express');
var app = express();

var UserPresenter = require('./presenter/UserPresenter')


// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

app.use('/user', UserPresenter);