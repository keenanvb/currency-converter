/*
Currency Converter
*/

let axios = require('axios');

let API_KEY = '';

const getExchangeRate = async (from, to) => {
    try {
        const res = await axios.get(`http://data.fixer.io/api/latest?access_key=${API_KEY}`);
        const euro = 1 / res.data.rates[from];
        const rate = euro * res.data.rates[to];

        if (isNaN(rate)) {
            throw new Error();
        }

        return rate
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} to ${to}.`)
    }
};

const getCountries = async (currencyCode) => {
    try {
        res = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return res.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode} currency code.`)
    }
}

const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const countries = await getCountries(to);
    const convertedAmount = (amount * rate).toFixed(2);

    return {
        from: from,
        to: to,
        amount: amount,
        convertedAmount: convertedAmount,
        countriesAvail: countries.join(', ')
    }
}

convertCurrency('USD', 'ZAR', 500).then((obj) => {
    console.log(obj);
}).catch((e) => {
    console.log(e);
});