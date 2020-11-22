import ProduktPage from './ProduktPage';
import ThankYouPage from './ThankYouPage';
import OrderPage from './OrderPage';
import AdminPage from './AdminPage';


import React, { useState } from 'react';



function App(props) {


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


    const [scena, setScena] = useState(vratScenu('produktPage'));


    return (
        <React.StrictMode>

            {scena}
        </React.StrictMode>
    )
}

export default App;
