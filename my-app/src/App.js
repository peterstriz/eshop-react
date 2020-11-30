import ProduktPage from './ProduktPage';
import ThankYouPage from './ThankYouPage';
import OrderPage from './OrderPage';
import AdminPage from './AdminPage';


import React, { useState, useEffect } from 'react';



function App(props) {
    const [scena, setScena] = useState(vratScenu('produktPage'));
    const [admin, setAdmin] = useState(false);


    function vratScenu(nazovSceny, options) {
        if (nazovSceny === 'produktPage') {
            return <ProduktPage
                zmenScenu={function (nazovSceny, options) { zmenScenu(nazovSceny, options) }}
            />
        }
        if (nazovSceny === 'orderPage') {
            return <OrderPage
                zmenScenu={function (nazovSceny, options) { zmenScenu(nazovSceny, options) }}
                kosik={options.kosik}
            />
        }
        if (nazovSceny === 'thankYouPage') {
            return <ThankYouPage
                zmenScenu={function (nazovSceny, options) { zmenScenu(nazovSceny, options) }}
                objednavka_id={options.objednavka_id}
            />
        }
        if (nazovSceny === 'adminPage') {
            return <AdminPage
                zmenScenu={function (nazovSceny, options) { zmenScenu(nazovSceny, options) }}
            />
        }
    }

    function zmenScenu(nazovSceny, options) {
        var novaScena = vratScenu(nazovSceny, options);
        setScena(novaScena);
    }


    useEffect(() => {
        let mounted = true;

        if (admin != null &&
            admin == false &&
            window.location.hash.substring(1) == 'admin') {

            if (mounted)
                setAdmin(true);

            if (mounted)
                var novaScena = vratScenu('adminPage', 0);

            if (mounted)
                setScena(novaScena);
        }

        return () => mounted = false;

    });


    return (
        <React.StrictMode>
            {scena}
        </React.StrictMode>
    )
}

export default App;
