import './AdminPage.css';

import React from 'react';

function AdminObjednavka(props) {

    return (
        <React.StrictMode>
            <div>{props.objednavka[0].meno}</div>
        </React.StrictMode>
    );
}

export default AdminObjednavka;
