import React, {Component} from "react";

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

    getLocation(lat,lng){
      let url = `https://www.google.com/maps?q=${lat},${lng}&z=20&t=m`
      return (
        <a href={url} target="_blank">Location</a>
      ) 
    }
  
    render() {
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
        if(val.name != undefined){
        return(
            <ul>
          <li>{`${val.symbol} ${val.code} ${val.name}`}</li>
            </ul>
        );
        }
      });

      let timezones = country.timezones.map((val)=>{
        if(val != undefined){
        return(
            <ul>
          <li>{val}</li>
            </ul>
        );
        }
      });


       return (
        <div className="Country-detail" onClick={() => this.toggleList()}>
        <li className="Country-detail-list">
        <div className="Country-detail-list-main">
        <div style={{flexGrow: '0.5'}}><img  style={{width: '50px', height: '50px'}} src={country.flag} alt="country flag" className="img-responsive"/><span></span></div>
        <div style={{flexGrow: '0.5'}}>{country.name}</div>
        <div style={{display:"flex",flexDirection:"column", flexGrow: '0.5'}}>
        <div>Capital</div>
        <div>{country.capital}</div>
        </div>
        <div style={{flexGrow: '0.2'}}>timezones: {timezones}</div>
        <div style={{flexGrow: '0.2'}}>Languages: {languages}</div>
        <div style={{flexGrow: '0.2'}}>Currencies: {currencies}</div>
        <div style={{flexGrow: '0.3'}}>Population: {country.population}</div>
        </div>
        {/* <div><img src={country.flag} alt="country flag" className="img-responsive"/><span></span></div>; */}
        {listOpen && <div className="Country-detail-list-sub-main" onClick={() => this.toggleList()}>
        <div>{this.getLocation(country.latlng[0],country.latlng[1])}</div>
        <div>Region: {country.region}</div>
        <div>Subregion: {country.subregion}</div>
        </div>}
        </li>
        <hr/>
        </div>
       )
       }
  }

 
  
  export default CountryListItem;
  