//libs
import React from 'react';

//components
import CountryListItem from './country_list_item';

const CountryList = (props)=>{
    console.log("CountryList: ",props);
    const CountryItems = props.country.map((country,index)=>{
    return ( 
        <CountryListItem key={index} country={country}/>) }
        );

    return (
        <div>
            <h2>Where you can spend it</h2>
            <div style={{overflowY:"scroll", height:"400px"}}>
            <ul className="List">
                {CountryItems}
            </ul>
            </div>
        </div>
    );
};

export default CountryList;