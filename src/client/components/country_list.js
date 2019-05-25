import React from 'react';

import CountryListItem from './country_list_item';

const CountryList = (props) => {
    const CountryItems = props.country.map((country, index) => {
        return (
            <CountryListItem key={index} country={country} />)
    }
    );

    return (
        <div>
            <h1>Where you can spend {props.result} {props.code}</h1>
            <div style={{ overflowY: "scroll", height: "400px" }}>
                <ul className="List">
                    {CountryItems}
                </ul>
            </div>
        </div>
    );
};

export default CountryList;