import React, { useState, useEffect } from 'react';
import PhoneNumber from '../../components/utility/PhoneNumber.js';
import EmailAddress from '../../components/utility/EmailAddress.js';
import TextInput from '../../components/utility/TextInput.js';
import NumberInput from '../../components/utility/NumberInput.js';

function PlayerInfo(props) {
const [player, setPlayer] = useState({"seasonId":props.seasonId, "playerType": props.playerType });

return(
    <>
        <TextInput
            id={props.nameId}
            label={props.nameLabel}
            name={props.nameKey}
            onChange={(event)=>{props.onChange(event, player, +props.playerIndex)}}
        />
        <EmailAddress
            id={props.emailId}
            label={props.emailLabel}
            name={props.emailKey}
            onChange={(event)=>{props.onChange(event, player, props.playerIndex)}}
        />
        {props.playerType != "Member" ?
            <PhoneNumber
                id={props.phoneId}
                label={props.phoneLabel}
                name={props.phoneKey}
                onChange={(event)=>{props.onChange(event, player, props.playerIndex)}}
            />
            :<></>
        }
    </>
   )

}

export default PlayerInfo;