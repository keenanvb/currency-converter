import React from 'react';
import CountryListItem from './CountryListItem';

const CountryList = ({ country }) => {

    const CountryItems = country.map((country, index) => {
        return (
            <CountryListItem key={index} index={index} country={country} />)
    }
    );

    return (
        <div style={{ overflowY: "scroll", height: "250px" }}>
            <ul>
                {CountryItems}
            </ul>
        </div>
    );
};

export default CountryList;