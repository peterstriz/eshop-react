import './ThankYouPage.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Reklama from './Reklama';


function ThankYouPage(props) {
    const [reklama, setReklama] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:8081/reklama');

            setReklama(result.data);
        }

        fetchData();
    }, []);


    return (
        <React.StrictMode>
            <button className="naspat" onClick={() => props.zmenScenu('produktPage')}><i className="fas fa-arrow-left"></i> Späť </button>
            <div className="podakovanie">Ďakujeme za Váš nákup</div>
            <div className="objednavka">
                <div className="text-objednavka">Číslo Vašej objednávky je&nbsp;</div>
                <div className="cislo-objednavka"> {props.objednavka_id}</div>
            </div>
            {reklama ?
                <Reklama
                    id={reklama.id}
                    nazov={reklama.nazov}
                    obrazok={reklama.obrazok}
                    url={reklama.url}
                /> : null
            }
        </React.StrictMode>
    )

}

export default ThankYouPage;
