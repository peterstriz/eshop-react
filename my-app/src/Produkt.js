import './ProduktPage.css';

import React, { useState } from 'react';

function Produkt(props) {
    var produkt = props.udaje;

    const [pocet, setPocet] = useState(0);


    return (
        <div className="produkt" >
            <img className="produkt-img" alt={"Obrazok " + produkt.nazov} src={produkt.obrazok} height='200px' width='200px' />
            <div className="nazov-produktu">{produkt.nazov.toString()}</div>
            <div className="cena-produktu">{produkt.cena.toString()}&euro;</div>
            <div className="pridanie-produktu">
                <button className="minus-kosik tlacitko-kosik" onClick={() => {
                    if (pocet > 0) {
                        setPocet(pocet - 1);
                        props.odoberZKosika(produkt)
                    }
                }}>-</button >
                <div className="pocet-kosik">{pocet.toString()}</div>
                <button className="plus-kosik tlacitko-kosik" onClick={() => {
                    setPocet(pocet + 1);
                    props.pridajDoKosika(produkt);
                }}>+</button>
            </div>
        </div >
    )
}

export default Produkt;
