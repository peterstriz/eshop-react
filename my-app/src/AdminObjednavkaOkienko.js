import './AdminPage.css';

import React from 'react';
import KosikProdukt from './KosikProdukt';


function AdminObjednavkaOkienko(props) {
    return (
        <React.StrictMode>
            <div className="objednavka-detail" style={{
                position: 'absolute',
                left: props.mousePoz.left,
                top: props.mousePoz.top
            }}>
                {props.objednavky.map(objednavka => (
                    <KosikProdukt
                        key={objednavka.nazov}
                        produkt={{
                            id: objednavka.id,
                            nazov: objednavka.nazov,
                            pocet: objednavka.pocet_produktov,
                            obrazok: objednavka.obrazok,
                            cena: objednavka.cena
                        }}
                    />
                ))}

            </div>
        </React.StrictMode>
    );
}

export default AdminObjednavkaOkienko;
