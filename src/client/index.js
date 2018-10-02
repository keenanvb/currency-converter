import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import utils from "./utils/utils";
import Dropdown  from "./components/Dropdown";
import CountryList from './components/country_list';

const data = require('./components/data.json');
const countryData = require('./components/countries.json');

class Index extends React.Component{
  constructor(){
    super()
    this.state = {
      from:'',
      to:'',
      amount:'',
      dropDownTitle1: 'Please select FROM',
      dropDownTitle2: 'Please select TO',
      location: data,
      countryInfo:countryData,
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

     return (<div>
              <label>
              From:
              </label>
               <Dropdown
                  status = 'from'
                  title={this.state.dropDownTitle1}
                  list={sortlocation}
                  toggleItem={this.toggleSelected}
                />
                <label>
              To:
                  </label>
                 <Dropdown
                  status = 'to'
                  title={this.state.dropDownTitle2}
                  list={sortlocation}
                  toggleItem={this.toggleSelected}
                />
                <label>
              Amount:
    <input type="text" name="name" ref="amount" />
  </label>
  <input type="submit" value="Submit" onClick={()=>this.getAmount()} />
<CountryList
country={this.state.countryInfo}
/>
            </div>)
     }
}

ReactDOM.render(<Index />, document.getElementById("index"));
