import React, { useState, useEffect } from 'react';

function EmailAddress (props) {


return(
    <>
        <div class="row">
            <div class="col-md-6">
                <label for={props.id}>{props.label}</label>
            </div>
            <div class="col-md-6">
                <input type="email" id={props.id} name={props.name} onChange={props.onChange}/>
            </div>
        </div>
    </>
   )

}

export default EmailAddress;