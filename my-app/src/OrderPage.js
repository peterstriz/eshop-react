import './OrderPage.css';

import React from 'react';
import KosikProdukt from './KosikProdukt';



function OrderPage(props) {
    var pocty = props.kosik.reduce((map, val) => {
        map[val.id] = (map[val.id] || 0) + 1;
        return map
    }, {});


    var kosik = [...new Set(props.kosik)];


    var suma = 0;
    for (var i = kosik.length - 1; i >= 0; i--) {
        kosik[i].pocet = pocty[kosik[i].id];
        suma += kosik[i].pocet * kosik[i].cena;
    }
    suma = Math.round(suma * 100) / 100;



    return (
        <React.StrictMode>
            <button onClick={() => props.zmenScenu('produktPage', 0)}> Späť </button>
            <div className="kosik">
                {kosik.map(produkt => (
                    <KosikProdukt
                        produkt={produkt}
                    />
                ))}
                <div className="suma">Cena spolu: {suma.toFixed(2)}&euro;</div>
            </div>

        </React.StrictMode>
    )
}

export default OrderPage;
