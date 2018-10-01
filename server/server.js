let express = require('express');
let bodyParser = require('body-parser');
let convert = require('./util/currency-convert');
let app = express();

app.use(bodyParser.json());

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