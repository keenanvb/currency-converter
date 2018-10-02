//libs
import React, {Component} from "react";
import country_list from './country_list';

// const CountryListItem = (props)=>{
//     const country = props.country;
//     // const onDriverClick = props.onDriverClick;
//     return(
//         // <li onClick={() => onDriverClick(driver)}>
//         <li>
//         <div>
//             name:{country.name}
//             capital: {country.capital}
//             population:{country.population}
//             latlng:{country.latlng}
//             {/* languages:{country.languages} */}
//             {/* flag:{country.flag} */}
//         </div>
//         {/* <div><img src={country.flag} alt="country flag" className="img-responsive"/><span></span></div>; */}
//         </li>
//     );
// }

// export default CountryListItem;

class CountryListItem extends Component { 
    constructor(props){
      super(props)
      this.state = {
        listOpen: false,
      }
  
    }
  
    handleClickOutside(){
      this.setState({
        listOpen: false
      })
    }
  
    toggleList(){
      this.setState(prevState => ({
        listOpen: !prevState.listOpen
      }))
    }
  
    render() {
      const{list,status, title} = this.props
      const{listOpen} = this.state
      const country = this.props.country;

      let languages = country.languages.map((val)=>{
        if(val.name != undefined){
          return(
            <ul>
          <li>{`${val.name}`}</li>
            </ul>
        );
        }
      });

      let currencies = country.currencies.map((val)=>{
        return(
            <ul>
          <li>{`${val.symbol} ${val.code} ${val.name}`}</li>
            </ul>
        );
      });


       return (
        <li onClick={() => this.toggleList()}>
        <div>
            {country.name}
            {country.capital}
            <div><img  style={{width: '50px', height: '50px'}} src={country.flag} alt="country flag" className="img-responsive"/><span></span></div>
        </div>
        {/* <div><img src={country.flag} alt="country flag" className="img-responsive"/><span></span></div>; */}
        {listOpen && <div className="list" onClick={() => this.toggleList()}>
        <div>population:{country.population}</div>
        <div>latlng:{country.latlng[0]} , {country.latlng[1]}</div>
        <div>region:{country.region}</div>
        <div>subregion:{country.subregion}</div>
        <div>languages:{languages}</div>
        <div>currencies:{currencies}</div>
        </div>}
        </li>
       )
       }
  }

 
  
  export default CountryListItem;
  