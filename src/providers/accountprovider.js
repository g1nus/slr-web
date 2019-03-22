import React, { Component } from 'react';

const AccountContext = React.createContext();

export const AccountConsumer = AccountContext.Consumer;

class AccountProvider extends Component {
  state = {
    image: <img className="face" alt="profile" src="https://placekitten.com/100/100"></img>,
    name:"Bobinsky", 
    surname:"Sylvester"
  }

  render () {
    return (
      <AccountContext.Provider value={this.state}>
        {this.props.children}
      </AccountContext.Provider>
    );
  }
}
  
  export default AccountProvider;