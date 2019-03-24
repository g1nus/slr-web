import React, {Component} from 'react';

//create a context object
const AccountContext = React.createContext();

/**
 * account component
 * offers a context object that storage user information and it can be acessed by all component-children
 */
class AccountProvider extends Component {
    render() {
        return (

         //*set the values of contenxt*
        <AccountContext.Provider value={{
            image: <img className="face" alt="profile" src="https://placekitten.com/100/100"></img>,
            name: "Bobinsky",
            surname: "Sylvester"
        }}>

            {/*mount all components received by props*/}
            {this.props.children}

        </AccountContext.Provider>
        );
    }
}

const AccountConsumer = AccountContext.Consumer;
export {AccountProvider, AccountConsumer};