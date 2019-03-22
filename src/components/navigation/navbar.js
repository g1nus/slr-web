import React, {Component} from "react";
import SideMenu from './sidemenu';

class NavBar extends Component {
  state = { toLeft: true };

  handleLink = e => {
    var data = e.target.getAttribute("data")
    this.setState(prevState => {
      if((data === "pag1" && prevState.toLeft) || (data === "pag2" && !prevState.toLeft)){
        return {
          toLeft: prevState.toLeft
        }
      }
      return {
        toLeft: !prevState.toLeft
      }
    });
    this.props.navhandler(data);
  }

  render(){
    return(
      <div className="navigation-wrapper">
        <nav className="main-nav"> </nav>
        <SideMenu handler={this.props.menuhandler} user={this.props.user_elements} menu_elements={this.props.menu_elements}></SideMenu>
      </div>
    );
  }
}

export default NavBar;