import './OrderPage.css';

import React from 'react';



function KosikProdukt(props) {
    var produkt = props.produkt;

    return (
        <React.StrictMode>
            <div key={produkt.id} className="kosikProdukt">
                <img className="produkt-img" alt={"Obrazok " + produkt.nazov} src={produkt.obrazok} height='50px' width='50px' />
                <div className="nazov-produktu">{produkt.nazov.toString()}</div>
                <div className="pocet-produktu">{produkt.pocet.toString()}ks</div>
                <div className="cena-produktu">{(Math.round((produkt.cena * produkt.pocet) * 100) / 100).toFixed(2)}&euro;</div>
            </div>


        </React.StrictMode>
    )
}

export default KosikProdukt;
