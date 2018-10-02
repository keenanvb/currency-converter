let express = require('express');
let bodyParser = require('body-parser');
let convert = require('./util/currency-convert');

let app = express();
const fs = require('fs');

app.use(bodyParser.json());

app.use(express.static('dist'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `Date ${now} ${req.method} ${req.url} \n`;
    fs.appendFile('logs.txt', log, (err) => {
        if (err) {
            console.log('Unable to append to log.txt')
        }
    });
    next();
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/api/convert', (req, res) => {
    let result = req.body;
    convert.convertCurrency(result.from, result.to, result.amount).then((obj) => {
        res.send(obj);
    }).catch((e) => {
        res.send(e);
    });
});

app.listen(3000, () => {
    console.log(`listeing on port 3000`);
});