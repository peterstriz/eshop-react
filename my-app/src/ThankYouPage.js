// import './ThankYouPage.css';

import React from 'react';



function ThankYouPage(props) {

    return (
        <React.StrictMode>
            <button onClick={() => props.zmenScenu('orderPage')}> Kúpiť </button>

        </React.StrictMode>
    )
}

export default ThankYouPage;
