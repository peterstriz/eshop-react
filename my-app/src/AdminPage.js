import './AdminPage.css';

import axios from 'axios';

import React, { useState, useEffect } from 'react';
import AdminObjednavka from './AdminObjednavka';
import AdminReklama from './AdminReklama';
import AdminObjednavkaOkienko from './AdminObjednavkaOkienko';





function AdminPage(props) {
    const [objednavky, setObjednavky] = useState([]);
    const [reklamy, setReklamy] = useState([]);
    const [detaily, setDetaily] = useState([]);
    const [mousePoz, setMousePoz] = useState({});


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

    function zobrazDetaily() {
        if (detaily.length > 0) {
            return <AdminObjednavkaOkienko
                objednavky={detaily}
                mousePoz={mousePoz}
            />
        }
        else
            return null;
    }


    function zobrazDetail(objednavka) {
        setDetaily(objednavka);

        document.onmousemove = function (e) {
            let left1 = parseInt(e.clientX);
            let top1 = parseInt(e.clientY);

            setMousePoz({ left: left1 + 3, top: top1 + 3 });
        };
    }

    function zrusDetail() {
        setDetaily([]);
        document.onmousemove = null;
    }

    function zobrazObjednavky() {
        var ret = [];

        objednavky.forEach(objednavka => {
            if (objednavka)
                ret.push(<AdminObjednavka
                    key={objednavka[0].id}
                    objednavka={objednavka}
                    zobrazDetail={function (objednavka) { zobrazDetail(objednavka); }}
                    zrusDetail={function () { zrusDetail(); }}
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

            {zobrazDetaily()}

        </React.StrictMode>
    )
}

export default AdminPage;
