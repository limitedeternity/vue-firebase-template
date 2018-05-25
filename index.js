var express = require('express');
var path = require('path');
var helmet = require('helmet');
var shrinkRay = require('shrink-ray-current');

var app = express();
app.use(helmet());
app.use(shrinkRay());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/sw.js', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(path.join(__dirname, 'dist', 'sw.js'));
});

app.listen(8080);
