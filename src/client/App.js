import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import './css/main.css';
import utils from "./utils/utils";
import Dropdown  from "./components/Dropdown";
import CountryList from './components/country_list';

const data = require('./components/data.json');
const countryData = require('./components/countries.json');

export class App extends React.Component{
  constructor(){
    super()
    this.state = {
      from:'',
      to:'',
      amount:'',
      dropDownTitleFrom: 'From',
      dropDownTitleTo: 'To',
      dropDownTitle1: 'What I Have',
      dropDownTitle2: 'What I Want',
      location: data,
      countryInfo:[],
      countryInfoDev:countryData,
      convertedCurrency:''
    }

    this.toggleSelected = this.toggleSelected.bind(this);

  }

  getAmount(){
    let amount = parseInt(this.refs.amount.value);
    let from = this.state.from;
    let to = this.state.to;

    if(from !=='' && to !==''){
          let result = {
            amount:amount,
            from:from,
            to:to
          }
         
          axios.post('http://localhost:3000/api/convert', {
            from:result.from,
            to: result.to,
            amount: result.amount
          })
          .then(response=> {
            this.setState({
              convertedCurrency:response.data.convertedAmount,
              countryInfo:response.data.countriesAvail
            })
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
          console.log(JSON.stringify(result,undefined,2));
      }

  }

  toggleSelected(id, title, currency, status){
    if(status === 'from'){
      this.setState({
        dropDownTitle1: `${title} ${currency}`,
        from: currency
      });
    }

    if(status === 'to'){
      this.setState({
        dropDownTitle2: `${title} ${currency}`,
        to: currency
      });
    }
  }

  render() {  

    const sortlocation = this.state.location.sort((x,y)=>{
      return x.title > y.title ? 1: -1;
    });

    let countryData = this.state.countryInfo;
    let result = this.state.convertedCurrency;
    let code = this.state.to;

     return (
            <div>
            <header className="App-header">
            <div>currency converter</div>
            </header>
            <div className="Container">
              {/* <label>From:</label> */}
              <div className="From">
              <Dropdown mainTitle={this.state.dropDownTitleFrom} status = 'from' title={this.state.dropDownTitle1} list={sortlocation} toggleItem={this.toggleSelected}/>
              </div>
              {/* <label>To:</label> */}
              <div className="To">
              <Dropdown mainTitle={this.state.dropDownTitleTo } status = 'to' title={this.state.dropDownTitle2} list={sortlocation} toggleItem={this.toggleSelected} />
              </div>
              <div className="User-input">
              {/* <label>Amount:</label> */}
              <input autoComplete="off" type="text" name="name" ref="amount" />
              
              <input type="submit" value="Submit" onClick={()=>this.getAmount()} />
              </div>
            </div>
            <div className="Container-country">
            {/* <CountryList country={this.state.countryInfoDev}/> */}
            <CountryList code={code}  result={result}  country={countryData}/>
            </div>
            </div>
            )
     }
}
