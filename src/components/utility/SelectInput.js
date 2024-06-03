import React, { useState, useEffect } from 'react';

function SelectInput (props) {


return(
    <>
        <select id={props.inputId} value={props.value} name={props.fieldName} onChange={props.onChange}>
            <option>{props.defaultOption}</option>
            {(props.options == null)?<></>:
                props.options.map((option, index) => {
                    return (
                        <option value={option[props.valueKey]}>{option[props.optionsKey]}</option>
                    );
                })
            }
        </select>
    </>
   )

}

export default SelectInput;