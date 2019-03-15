import React from "react";
import { SideMenu } from './sidemenu';

export class NavBar extends React.Component{
    render(){
        return (
            <div className="navigation-wrapper">
                <nav className="main-nav">
                    {this.props.nav_elements.map((element) =>
                        <div key={element.id}>
                        {element.content}
                        </div>
                    )}
                </nav>
                <SideMenu user={this.props.user_elements} menu_elements={this.props.menu_elements}></SideMenu>
            </div>
        );
    }
}
