import React, { useState, useEffect } from 'react';

import BarsTable from '../components/bars/BarsTable.js';
import PhoneNumber from '../components/utility/PhoneNumber.js';
import EmailAddress from '../components/utility/EmailAddress.js';
import TextInput from '../components/utility/TextInput.js';
import NumberInput from '../components/utility/NumberInput.js';
import AddressFieldset from '../components/utility/AddressFieldset.js';
import CurrentSeason from '../components/season/CurrentSeason.js';


function AddPubPage(props) {

const [pub, setPub] = useState({"seasonId":props.seasonId});
const [address, setAddress] = useState({});

const handleSubmit = event => {
    event.preventDefault();
    console.log('props: ' + JSON.stringify(props));
    console.log('form submitted ✅');
    console.log('pub: ' + JSON.stringify(pub));

    fetch('http://localhost:8080/api/v1/registerBar', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(pub),
   })
   .then((response) => {
      if(!response.ok) throw new Error(response.status);
       else return response.json()
   })
   .catch((error) => {
       console.log('error: ' + error);
   });
};

const handleInputChange = (event) => {
    pub[event.target.name]= event.target.value;
}

const handleAddressChange = (event) => {
    address[event.target.name] = event.target.value;
    pub["address"] = address;
}

    return (
        <>
            <h1>Register OPDL Pub</h1>
            <CurrentSeason seasonId = {props.seasonId}/>
            <form id="registerPubForm" onSubmit={handleSubmit}>
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <TextInput
                            id="pubNameId"
                            label="Pub Name"
                            name="barName"
                            onChange={handleInputChange}
                        />
                        <AddressFieldset
                            legend="Pub Address Details"
                            onChange={handleAddressChange}
                            />
                        <TextInput
                            id="pubOwnerId"
                            label="Pub Contact Name"
                            name="ownerName"
                            onChange={handleInputChange}
                        />
                        <EmailAddress
                            id="pubEmailId"
                            label="Contact Email"
                            name="emailAddress"
                            onChange={handleInputChange}
                        />
                        <PhoneNumber
                            id="pubPhoneId"
                            label="Contact Phone #"
                            name="phoneNumber"
                            onChange={handleInputChange}
                        />
                        <NumberInput
                            id="numBoardsId"
                            label="Number of Boards"
                            name="numBoards"
                            onChange={handleInputChange}
                        />
                        <div class="row justify-content-end">
                            <input type="submit" id="submitPubRegistration" class="col-md-3 btn btn-primary"/>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddPubPage;