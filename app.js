const express = require('express');
const bodyParser = require('body-parser');
const locationRoutes = require('./routes/location')
const PORT = 4000;

const app = express();

//app.set('view engine', 'ejs');
//app.set('views', 'views');

app.use(bodyParser.json());
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(locationRoutes);

// app.use((request, response, next) => {
//     response.setHeader('Content-Type', 'text/html');
//     next();
// });

// app.use((request, response, next) => {
//     const userName = request.body.username || 'Unknown user!';
//     response.render('index', {
//         user: userName
//     });
// });

app.listen(PORT);