import React, {Component} from "react";

/**
 * compotent main of page
 */
class Main extends Component {
    state = {};

    render() {
        return (
            <div className="main-wrapper">
                {this.props.main_element}
            </div>
        );
    }
};

export default Main;