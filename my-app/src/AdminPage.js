import './AdminPage.css';

import axios from 'axios';

import React, { useState, useEffect } from 'react';
import AdminObjednavka from './AdminObjednavka';
import AdminReklama from './AdminReklama';





function AdminPage(props) {
    const [objednavky, setObjednavky] = useState([]);
    const [reklamy, setReklamy] = useState([]);


    useEffect(() => {
        const fetchObjednavky = async () => {
            const objednavkyRes = await axios('http://localhost:8081/objednavky');

            var objednavky = [];

            objednavkyRes.data.forEach(objednavka => {
                if (!objednavky[objednavka.id]) {
                    objednavky[objednavka.id] = [];
                }
                objednavky[objednavka.id].push(objednavka);
            });

            setObjednavky(objednavky);
        }

        const fetchReklamy = async () => {
            const result = await axios('http://localhost:8081/reklamy');
            setReklamy(result.data);
        }

        fetchObjednavky();
        fetchReklamy();
    }, []);



    function zobrazObjednavky() {
        var ret = [];

        objednavky.forEach(objednavka => {
            if (objednavka)
                ret.push(<AdminObjednavka
                    key={objednavka[0].id}
                    objednavka={objednavka}
                />)
        })

        return ret;
    }

    function zobrazReklamy() {
        return reklamy.map(reklama => (
            <AdminReklama
                key={reklama.id}
                reklama={reklama}
            />
        ));
    }

    return (
        <React.StrictMode>
            <button className="naspat" onClick={() => props.zmenScenu('produktPage', 0)}><i className="fas fa-arrow-left"></i> Späť </button>

            <table className="tabulka-reklama">
                <thead>
                    <tr>
                        <th>Počet klikov</th>
                        <th>Názov</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {zobrazReklamy()}
                </tbody>
            </table>

            <table className="tabulka-objednavka">
                <thead>
                    <tr>
                        <th>Číslo objednávky</th>
                        <th>Meno</th>
                        <th>Suma</th>
                        <th>Stav</th>
                    </tr>
                </thead>
                <tbody>
                    {zobrazObjednavky()}
                </tbody>
            </table>

        </React.StrictMode>
    )
}

export default AdminPage;
