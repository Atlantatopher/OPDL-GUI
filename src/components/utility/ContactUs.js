import React, { useState, useEffect } from 'react';
import './ContactUs.css';

import Discord_correct from '../images/Discord_correct.png';
import FB_QR_Code from '../images/FB_QR_Code.png';
import WEB_QR_Code from '../images/WEB_QR_Code.png';

function ContactUs(props) {


return(
    <>
        <div class="row justify-content-center contactus">
            <div class="col-4">
                <img src={Discord_correct} alt="Join Discord Server QR Code"/>
            </div>
            <div class="col-4">
                <img src={FB_QR_Code} alt="Join Facebook QR Code"/>
            </div>
            <div class="col-4">
                <img src={WEB_QR_Code} alt="Website QR Code"/>
            </div>
        </div>
    </>
   )

}

export default ContactUs;