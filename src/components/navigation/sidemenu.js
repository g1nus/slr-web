import React from "react";

class UserInfo extends React.Component{
    render(){
        return (
            <div className="user" >
                {this.props.user.image}
                <div className="user-info">
                    {this.props.user.name}
                    <br/>
                    {this.props.user.surname}
                </div>
            </div>
        );
    }
}

class Menu extends React.Component{
    render(){
        var cls = "modal side-menu up";
        if(this.props.show){
            cls="modal side-menu down"
        }
        if(this.props.firsttime){
            cls="modal side-menu"
        }
        return (
            <div className={cls} >
                <UserInfo user={this.props.user}></UserInfo>
                {this.props.elements.map((element) =>
                    <div key={element.id}>
                    {element.content}
                    </div>
                )}
            </div>
        );
    }
}

export class SideMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {shown: false, firsttime: true};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick(){
        this.setState(prevstate => ({
            shown: !prevstate.shown,
            firsttime: false
        }));
    }

    render(){
        var cls = "button-wrapper close";
        if(this.state.shown){
            cls="button-wrapper open"
        }
        return (
        <div className="menu">
            <div className={cls} onClick={this.handleToggleClick}>
                <svg id="button" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 1000 1000" xmlSpace="preserve">
                    <path class="st0" d="M214,482.1"/>
                    <line class="st-t" x1="172" y1="482.1" x2="172" y2="482.1"/>
                    <line class="st-m" x1="500" y1="482.1" x2="500" y2="482.1"/>
                    <line class="st-b" x1="828" y1="482.1" x2="828" y2="482.1"/>
                </svg>
            </div>
            <Menu firsttime={this.state.firsttime} show={this.state.shown} user={this.props.user} elements={this.props.menu_elements}></Menu>
        </div>);
    }
}
