let express = require('express');
let convert = require('./util/currency-convert');

let app = express();

//Init middleware
app.use(express.json({ extended: false }));

// app.use((req, res, next) => {
//     let now = new Date().toString();
//     let log = `Date ${now} ${req.method} ${req.url} \n`;
//     fs.appendFile('logs.txt', log, (err) => {
//         if (err) {
//             console.log('Unable to append to log.txt')
//         }
//     });
//     next();
// });

app.get('/', (req, res) => {
    res.send('hello')
});

app.post('/api/convert', async (req, res) => {
    const { from, to, amount } = req.body

    try {
        let result = await convert.convertCurrency(from, to, amount);
        res.send(result);
    } catch (e) {
        res.send(e);
    }


    // convert.convertCurrency(result.from, result.to, result.amount).then((obj) => {
    //     res.send(obj);
    // }).catch((e) => {
    //     res.send(e);
    // });
});

/*
//serve static assets in profuction
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
*/


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})