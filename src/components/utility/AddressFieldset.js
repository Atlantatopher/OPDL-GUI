import React, { useState, useEffect } from 'react';

function AddressFieldset (props) {


return(
    <>
        <fieldset>
            <legend>{props.legend}</legend>
            <div class="row">
                <div class="col-md-6">
                    <label for="addressLineId">Address Line</label>
                </div>
                <div class="col-md-6">
                    <input id="addressLineId" type="text" name="addressLine" onChange={props.onChange}/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label for="cityId">City</label>
                </div>
                <div class="col-md-6">
                    <input id="cityId" type="text" name="city" onChange={props.onChange}/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label for="stateId">State</label>
                </div>
                <div class="col-md-6">
                    <input id="stateId" type="text" name="stateCode" onChange={props.onChange}/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label for="zipId">Postal Code</label>
                </div>
                <div class="col-md-6">
                    <input id="zipId" type="number" name="zipCode" onChange={props.onChange}/>
                </div>
            </div>
        </fieldset>
    </>
   )

}

export default AddressFieldset;