import React, {Component} from "react";
import SideMenu from './sidemenu';
import { Flipper, Flipped } from 'react-flip-toolkit';

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
        <nav className="main-nav">
          <div className="nav-link-wrapper">
            {this.props.nav_elements.map((element, index) =>
              <div className={"nav-link " + element.selected} key={index}>
                <a data={element.link} onClick={this.handleLink} href="#">{element.content}</a>
              </div>
            )}
            <Flipper flipKey={this.state.toLeft}>
              <Flipped flipId="underline">
                <div
                  className={this.state.toLeft ? "underline underline-to-left" : "underline underline-to-right"}
                />
              </Flipped>
            </Flipper>
          </div>
        </nav>
        <SideMenu handler={this.props.menuhandler} user={this.props.user_elements} menu_elements={this.props.menu_elements}></SideMenu>
      </div>
    );
  }
}

export default NavBar;