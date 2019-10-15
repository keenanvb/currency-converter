import React, { Component } from "react";
const CountryListItem = ({ country, index }) => {

  const getLocation = (lat, lng) => {
    let url = `https://www.google.com/maps?q=${lat},${lng}&z=20&t=m`
    return (
      <a href={url} target="_blank">Location</a>
    )
  }

  // const country = this.props.country;
  // const index = this.props.index

  let languages = country.languages.map((val) => {
    if (val.name != undefined) {
      return (
        <ul>
          <li>{`${val.name}`}</li>
        </ul>
      );
    }
  });

  let currencies = country.currencies.map((val) => {
    if (val.name != undefined) {
      return (
        <ul>
          <li>{`${val.symbol} ${val.code} ${val.name}`}</li>
        </ul>
      );
    }
  });

  let timezones = country.timezones.map((val) => {
    if (val != undefined) {
      return (
        <ul>
          <li>{val}</li>
        </ul>
      );
    }
  });

  return (
    <div className='country-container'>
      <div>
        <div>{index + 1}</div>
        <div><img style={{ width: '250px', height: '250px' }} src={country.flag} alt="country flag" className="img-responsive" /><span></span></div>
      </div>

      <div className="country-details">

        <div>name: {country.name}</div>
        <div>Capital: {country.capital}</div>
        <div>Currencies: {currencies}</div>
        <div>Population: {country.population}</div>
        <div>Languages: {languages}</div>
      </div>
      <div className="country-details-extra">
        <div>timezones: {timezones}</div>
        <div>{getLocation(country.latlng[0], country.latlng[1])}</div>
        <div>Region: {country.region}</div>
        <div>Subregion: {country.subregion}</div>
      </div>
    </div>
  )
}

export default CountryListItem;
