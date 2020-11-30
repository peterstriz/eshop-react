import './ProduktPage.css';

import React, { useReducer } from 'react';

import Produkty from './Produkty';


function ProduktPage(props) {
    const [kosik, nastavKosik] = useReducer(kosikReducer, []);

    function kosikReducer(state, action) {
        switch (action.type) {
            case 'add':
                return [...state, action.produkt];
            case 'remove':
                const update = [...state];
                update.splice(update.indexOf(action.produkt), 1);
                return update;
            default:
                return state;
        }
    }

    function pridajDoKosika(produkt) {
        nastavKosik({ produkt, type: 'add' });
    }

    function odoberZKosika(produkt) {
        nastavKosik({ produkt, type: 'remove' });
    }

    return (
        <React.StrictMode>
            <button className="kupit" onClick={() => props.zmenScenu('orderPage', { kosik: kosik })}><i className="fas fa-shopping-cart"></i> Pokračovať do košíka </button>

            <Produkty
                pridajDoKosika={function (produkt) { pridajDoKosika(produkt) }}
                odoberZKosika={function (produkt) { odoberZKosika(produkt) }}
            />

            {/* <button className="admin" onClick={() => props.zmenScenu('adminPage', 0)}><i className="fas fa-user-lock"></i> Admin</button> */}

        </React.StrictMode >
    )
}

export default ProduktPage;
