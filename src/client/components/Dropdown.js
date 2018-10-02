import React, {Component} from "react";

let FontAwesome = require('react-fontawesome');

class Dropdown extends Component { 
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
    }

    this.toggleItem = this.props.toggleItem.bind(this);
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
     return (
      <div className="wrapper">
      <div className="header" onClick={() => this.toggleList()}>
          <div className="header-title">{title}</div>
          {listOpen
            ? <FontAwesome name="angle-up" size="2x"/>
            : <FontAwesome name="angle-down" size="2x"/>
          }
      </div>
       {listOpen && <ul className="list" onClick={() => this.toggleList()}>
         {list.map((item) => (
           <li className="list-item" key={`${item.id}${item.title}`} onClick={()=>this.toggleItem(item.id, item.title, item.currency, status)}>{item.title} {item.currency}{item.selected && <FontAwesome name="check"/>}</li>
          ))}
        </ul>}
      </div>
     )
     }
}

export default Dropdown;
