import React, { useState, useEffect } from 'react';
import './ContactUs.css';

import Discord_correct from '../images/Discord_correct.png';
import FB_QR_Code from '../images/FB_QR_Code.png';
import WEB_QR_Code from '../images/opdl.net.png';

function ContactUs(props) {


return(
    <>
        <div class="row justify-content-center contactus">
            <div class="col-md-8 col-lg-6">
                <div class="row">
                    <div class="col-4">
                        <img src={Discord_correct} alt="Join Discord Server QR Code"/>
                        <p>Discord</p>
                    </div>
                    <div class="col-4">
                        <img src={FB_QR_Code} alt="Join Facebook QR Code"/>
                        <p>Facebook</p>
                    </div>
                    <div class="col-4">
                        <img src={WEB_QR_Code} alt="Website QR Code"/>
                        <p>WWW</p>
                    </div>
                </div>
            </div>
        </div>
    </>
   )

}

export default ContactUs;