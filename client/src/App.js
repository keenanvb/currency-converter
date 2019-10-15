import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

import NavBar from './components/NavBar'
import Dropdown from './components/Dropdown'
import Loading from './components/Loading'
import CountryList from './components/CountryList';

const countryData = require('./components/countries.json');
const data = require('./utils/data.json');

const App = () => {

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    amount: '',
    dropDownTitle1: 'What I have',
    dropDownTitle2: 'What I want',
    convertedAmount: '',
    countriesAvail: [],
    isLoading: false
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  let selectedItem = (id, title, code, status) => {
    if (status === 'from') {
      setFormData({
        ...formData, dropDownTitle1: `What I have: ${title} - ${code}`,
        from: code
      });
    }

    if (status === 'to') {
      setFormData({
        ...formData, dropDownTitle2: `What I want: ${title} - ${code}`,
        to: code
      });
    }
  }

  let getAmount = async () => {
    const { from, to, amount } = formData
    setFormData({
      ...formData, isLoading: true
    });
    try {
      let res = await axios.post('/api/convert', {
        from,
        to,
        amount
      })
      setFormData({
        ...formData, convertedAmount: res.data.convertedAmount,
        countriesAvail: res.data.countriesAvail,
        isLoading: false
      });
      // console.log(JSON.stringify(res.data, undefined, 2));
    } catch (e) {
      console.log(e);
    }
  }

  const { dropDownTitle1, dropDownTitle2, amount, convertedAmount, countriesAvail, code, to, isLoading } = formData
  // console.log('formData', formData);

  const sortedData = data.sort((x, y) => {
    return x.title > y.title ? 1 : -1;
  });

  const displayCountryinfo = () => {
    console.log('yes available logging')
    if (countriesAvail.length > 0) {
      console.log('yes available')
      return (
        < CountryList code={code} country={countriesAvail} />
      )
    } else {
      return null
    }
  }

  return (
    <div>
      <NavBar />
      <div className='container'>
        <div className='top-container'>
          <Dropdown dropDownTitle={dropDownTitle1} status='from' dropdownData={sortedData} selectedItem={selectedItem} />
          <Dropdown dropDownTitle={dropDownTitle2} status='to' dropdownData={sortedData} selectedItem={selectedItem} />
          <div className='input-container'>
            <div className='input-container-text'>
              {`AMOUNT:${amount}`}
            </div>
            <div className='input-container-amount'>
              <input
                placeholder='Amount'
                autoComplete="off"
                type="text"
                value={amount}
                name="amount"
                onChange={(e) => { onChange(e) }}
                maxLength="10"
              />
            </div>
            <div className='input-container-button'>
              <input className="btn" type="submit" value="Submit" onClick={() => getAmount()} />
            </div>
            {/* <div>
              {convertedAmount ?
                `TOTAL: ${convertedAmount}` : null
              }
            </div> */}
          </div>
        </div>
        <div className='middle-container'>
          {convertedAmount ?
            `TOTAL: ${convertedAmount} ${to}` : null
          }

        </div>
        <div className='bottom-container'>
          {isLoading ? <Loading /> : null}
          {countriesAvail ? < CountryList code={code} country={countriesAvail} /> : null}
          {/* dev */}
          {/* <CountryList code={code} country={countryData} /> : null */}
        </div>
      </div>

    </div >
  );
}

export default App;
