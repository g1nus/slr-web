import React,{useState} from "react";

import OptionsButton from 'src/components/svg/optionsButton';

/**
 * component side options
 * it needs a class for the styling,
 * an array of options,
 * the function that will handle the click on the option
 * and, if necessary, a target for the handler function
 */
const SideOptions = function ({cls, options, handler, target}) {

    //this is used to display or hide the options of the menu
    const [focused, setFocused] = useState(false)


    return (
        <div className={cls}>
            <button type="button" 
                    onBlur={(e) => 
                        //if the element is blurred then I hide it
                        {if(focused){setFocused(false)}}} 
                    onMouseDown={(e) => //onMouseDown fires before onBlur
                        //immediately after the button is clicked I toggle the menu
                        {setFocused(!focused)}}>
                <OptionsButton/>
            </button>
            <div style={{fontSize: (focused) ? "12px" : "0px", padding: (focused) ? "2px" : "0px", border: (focused) ? "solid 1px #e8e8e8" : "solid 0px #e8e8e8"}} className="options-list">
                
                {options.map((element, index) => 
                    <div key={index} onMouseDown={(e) => handler(target)} className="option">{element}</div>
                )}
                
            </div>
        </div>
    );
}

export default SideOptions;