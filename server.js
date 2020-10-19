const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

app.enable('trust proxy');
app.use(function(req, res, next) {
    if (req.secure) {
        return next();
    }
    res.redirect('https://' + req.headers.host + req.url);
});
app.use(express.static(__dirname + '/dist/'));
app.get(/.*/, function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);
