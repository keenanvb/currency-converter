//libs
import React from 'react';

//components
import CountryListItem from './country_list_item';

const CountryList = (props)=>{
    console.log("CountryList: ",props);
   const CountryItems = props.country.map((country,index)=>{
   return (<CountryListItem
        // onDriverClick = {props.onDriverSelect}
        key={index}
        country={country}/>)       
    });

    return (
        <div>
            <ul>
                {CountryItems}
            </ul>
        </div>
    );
};

export default CountryList;