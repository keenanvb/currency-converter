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

  displayFirstLetter(list,item,index){
    let titles = list.map((item)=>{
      return item.title[0]
    })

    let prevTitle = titles[index-1];
    if(titles[index] == item.title[0]){
      if(prevTitle != item.title[0]){
        return(
          <div className="displayFirst">
            {item.title[0]}
          </div>
        )
      }
    }else{
      return(
        null
      )
    }
  }

  render() {
    const{list,status, title, mainTitle} = this.props
    const{listOpen} = this.state
     return (
    
      <div className="wrapper">
      <div className="header-title">{mainTitle}</div>
      <div style={{overflowY:"scroll", height:"120px"}}>
      <div className="header" onClick={() => this.toggleList()}>
          <div className="header-title">{title}</div>
          {listOpen
            ? <FontAwesome name="angle-up" size="2x"/>
            : <FontAwesome name="angle-down" size="2x"/>
          }
      </div>
       {listOpen && <ul className="Dropdown-list" onClick={() => this.toggleList()}>
         {list.map((item,index) => (
           <div>
             <div key={`${item.id}`}>
             {this.displayFirstLetter(list,item,index)}
            </div>
           <li className="list-item" key={`${item.id}${item.title}`} onClick={()=>this.toggleItem(item.id, item.title, item.currency, status)}>{item.title} {item.currency}{item.selected && <FontAwesome name="check"/>}</li>
            </div>
          ))}
        </ul>}
      </div>
      </div>
     )
     }
}

export default Dropdown;
