import './ThankYouPage.css';

import React from 'react';
import axios from 'axios';


function Reklama(props) {

    function pocitadloInkrement(e, id) {
        axios.get('http://localhost:8081/pocitadlo', {
            params: {
                id: id
            }
        }).then(response => console.log(response.data)
        ).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <React.StrictMode>
            <div className="reklama-banner">
                <div className="reklama-text">Reklama</div>
                <a className="reklama-href"
                    onClick={e => pocitadloInkrement(e, props.id)}
                    href={props.url}
                >
                    <img className="reklama-img" alt={"Obrazok " + props.nazov} src={props.obrazok}

                    />
                </a>
            </div>
        </React.StrictMode >
    )

}

export default Reklama;
