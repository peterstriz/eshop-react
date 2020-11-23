import './AdminPage.css';

import React from 'react';

function AdminReklama(props) {

    return (
        <React.StrictMode>
            <tr className='reklama-riadok'>
                <td className='reklama-riadok-pocet'>{props.reklama.pocet_klikov}</td>
                <td className='reklama-riadok-nazov'>{props.reklama.nazov}</td>
                <td className='reklama-riadok-url'>{props.reklama.url}</td>
            </tr>
        </React.StrictMode>
    );
}

export default AdminReklama;
