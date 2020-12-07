import './AdminPage.css';

import React, { useState } from 'react';
import axios from 'axios';


function AdminObjednavka(props) {
    const [stav, setStav] = useState(props.objednavka[0].stav);

    var sumaSpolu = 0;
    props.objednavka.forEach(p => {
        sumaSpolu += p.suma;
    });

    function potvrdObjednavku(id, button) {
        if (stav === 'spracovana')
            return;


        axios.get('http://localhost:8081/spracujObjednavku', {
            params: { id: id }
        }).then(function (response) {
            if (response.data.stav === 'spracovana') {
                setStav('spracovana');
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <React.StrictMode>
            <tr className='objednavka-riadok'
                onMouseEnter={e => props.zobrazDetail(props.objednavka)}
                onMouseLeave={e => props.zrusDetail()}
            >

                <td className='objednavka-riadok-id'>{props.objednavka[0].id}</td>
                <td className='objednavka-riadok-meno'>{props.objednavka[0].meno}</td>
                <td className='objednavka-riadok-url'>{Math.round(sumaSpolu * 100) / 100}&euro;</td>
                <td className='objednavka-riadok-stav'
                    onMouseEnter={e => props.zrusDetail()}
                    onMouseLeave={e => props.zobrazDetail(props.objednavka)}
                >
                    <button className={stav} onClick={e => potvrdObjednavku(props.objednavka[0].id, e.target)}> {stav} </button>
                </td>
            </tr>
        </React.StrictMode>
    );
}

export default AdminObjednavka;
