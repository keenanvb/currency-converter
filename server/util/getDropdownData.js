let axios = require('axios');
let fs = require('fs');

axios.get(`https://restcountries.eu/rest/v2/all`)
  .then(function (response) {
    let data = response.data.map((country, index) => {
      return {
        "id": `${index}`,
        "title": `${country.name}`,
        "code": `${country.currencies[0].code}`,
        "selected": false,
        "key": "location"
      }
    });
    fs.writeFileSync(__dirname + '/countries.json', JSON.stringify(data));
  })
  .catch(function (error) {
    console.log('error', error);
  })