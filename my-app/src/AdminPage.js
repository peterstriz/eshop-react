// import './AdminPage.css';

import React from 'react';



function AdminPage(props) {

    return (
        <React.StrictMode>
            <button onClick={() => props.zmenScenu('orderPage')}> Kúpiť </button>

        </React.StrictMode>
    )
}

export default AdminPage;
