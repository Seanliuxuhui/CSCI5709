const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const fs = require('fs');
const serverPort = 3000;
const app = express();
const router = express.Router();
const dir = __dirname;

app.use(cors());
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json({limit: '50mb', type: 'application/vnd.api + json'}));

//define the entry point to the website
router.get('/', function (req, res) {
    res.sendFile(path.join(dir, 'views/htmls/home.html'));
});

fs.readdir(path.join(dir, 'views', 'htmls'), function (err, files) {
    if (err) console.error(err);
    files.forEach(function (file) {
        router.get('/' + file, function (req, res) {
            res.sendFile(path.join(dir, 'views', 'htmls', file));
        });
    });
});

app.use('/js', express.static(path.join(dir, 'views', 'js')));
app.use('/images', express.static(path.join(dir, 'views', 'images')));
app.use('/css', express.static(path.join(dir, 'views', 'css')));
app.use('/', router);
app.use('/api', require('./api/index'));



app.listen(serverPort);
console.log(`Application is listening on port: ${serverPort}, environment: ${env}`);