import React, { useState, useEffect } from 'react';

function ButtonBar(props) {


return(
    <>
        <div class="row justify-content-end">
            <div class="col-md-6">
            <button class="btn btn-primary col-md-3" type="button" id={props.id} onClick={props.onClick}>
                {props.value}
            </button>
            </div>
        </div>
    </>
   )

}

export default ButtonBar;