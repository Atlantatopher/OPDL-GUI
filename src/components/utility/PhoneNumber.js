import React, { useState, useEffect } from 'react';

function PhoneNumber (props) {


return(
    <>
        <div class="row">
            <div class="col-md-6">
                <label for={props.id}>{props.label}</label>
            </div>
            <div class="col-md-6">
                <input type="number" id={props.id} name={props.name} onChange={props.onChange}/>
            </div>
        </div>
    </>
   )

}

export default PhoneNumber;