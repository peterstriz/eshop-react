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
            <button className="kupit" onClick={() => props.zmenScenu('orderPage', { kosik: kosik })}><i class="fas fa-shopping-cart"></i> Kúpiť </button>

            <Produkty
                pridajDoKosika={function (produkt) { pridajDoKosika(produkt) }}
                odoberZKosika={function (produkt) { odoberZKosika(produkt) }}
            />
        </React.StrictMode >
    )
}

export default ProduktPage;
