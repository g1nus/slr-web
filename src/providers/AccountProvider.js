import React, { Component } from 'react';

const AccountContext = React.createContext();

class AccountProvider extends Component {
  render () {
    return (
      <AccountContext.Provider value={{
        image: <img className="face" alt="profile" src="https://placekitten.com/100/100"></img>,
        name:"Bobinsky", 
        surname:"Sylvester"
      }}>
        {this.props.children}
      </AccountContext.Provider>
    );
  }
}

const AccountConsumer = AccountContext.Consumer; 
export {AccountProvider, AccountConsumer};