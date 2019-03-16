import React from "react";

export class Main extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="main-wrapper">
        {this.props.main_element}
      </div>
    );
  }
}
