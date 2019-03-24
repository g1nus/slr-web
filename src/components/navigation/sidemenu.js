import React, {Component} from "react";
import { AccountConsumer } from '../../providers/AccountProvider'
import { Link } from 'react-router-dom'

const UserInfo = () => (
  <AccountConsumer>
     {({ image, name, surname }) => (
      <div className="user" >
        {image}
        <div className="user-info">
          {name}
          <br/>
          {surname}
        </div>
      </div>  
     )}
  </AccountConsumer>
);

class SideMenu extends Component{
  state = {
    shown: false, 
    firsttime: true
  };

  handleToggleMenuButton = () =>{
    this.setState(prevstate => ({
      shown: !prevstate.shown,
      firsttime: false,
      menufocus: !prevstate.focus
    }));
  }

  handleMenuBlur = () =>{
    this.setState(prevstate => ({
      shown: false
    }));
  }

  render(){
    var clsidemenu = "modal side-menu up";
    var clsbutton = "button-wrapper close";
    if(this.state.firsttime){
      clsidemenu="modal side-menu"
    }
    if(this.state.shown){
      clsbutton="button-wrapper open"
      clsidemenu="modal side-menu down"
    }
    return (
      <div className="menu">
        <div className={clsbutton} onClick={this.handleToggleMenuButton}>
          <svg id="menu-button" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 1000 1000">
            <path className="st0" d="M214,482.1"/>
            <line className="st-t" x1="172" y1="482.1" x2="172" y2="482.1"/>
            <line className="st-m" x1="500" y1="482.1" x2="500" y2="482.1"/>
            <line className="st-b" x1="828" y1="482.1" x2="828" y2="482.1"/>
          </svg>
      </div>
      <div className={clsidemenu} tabIndex={-1}>
        <UserInfo user={this.props.user}></UserInfo>
        {this.props.menu_elements.map((element, index) =>
          <div key={index}>
            <Link to={element.link} className="menu-option" onMouseUp={this.handleMenuBlur}>{element.content}</Link>          
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default SideMenu;