import './OrderPage.css';

import React from 'react';
import KosikProdukt from './KosikProdukt';
import axios from 'axios';



class OrderPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meno: '',
            mesto: '',
            cisloDomu: '',
            psc: '',
            ulica: ''
        };

        this.vytvorObjednavku = this.vytvorObjednavku.bind(this);

        this.kosik = [...new Set(this.props.kosik)];
        this.suma = 0;

        this.pridajPoctyProduktovAUpdatniSumu();
    }

    pridajPoctyProduktovAUpdatniSumu() {
        var pocty = this.props.kosik.reduce((map, val) => {
            map[val.id] = (map[val.id] || 0) + 1;
            return map
        }, {});

        for (var i = this.kosik.length - 1; i >= 0; i--) {
            this.kosik[i].pocet = pocty[this.kosik[i].id];
            this.suma += this.kosik[i].pocet * this.kosik[i].cena;
        }
        this.suma = Math.round(this.suma * 100) / 100;
    }

    vytvorObjednavku(event) {
        event.preventDefault();
        if (this.state.meno.length === 0) {
            alert('Vyplňte meno.');
            return;
        }
        /*if (this.state.ulica.length === 0) {
            alert('Vyplňte ulicu.');
            return;
        }
        if (this.state.cisloDomu.length === 0) {
            alert('Vyplňte číslo domu.');
            return;
        }
        if (this.state.mesto.length === 0) {
            alert('Vyplňte mesto.');
            return;
        }
        if (this.state.psc.length === 0) {
            alert('Vyplňte PSČ.');
            return;
        }*/

        // ak sa pouziva meno niekym inym
        axios.get('http://localhost:8081/existuje', {
            params: {
                meno: this.state.meno
            }
        }).then(response => this.vytvorObjednavkuSql(response)
        ).catch(function (error) {
            console.log(error);
        })/*.then(function () {
            // always executed
        });*/


        // this.props.zmenScenu('thankYouPage', 0)
    }

    vytvorObjednavkuSql(response) {
        if (response.data.existuje) {
            alert('Meno sa už používa niekým iným.');
            return;
        }

        var parametre = this.state;
        parametre.kosik = [];

        this.kosik.forEach(produkt => {
            parametre.kosik.push({
                id: produkt.id,
                pocet: produkt.pocet
            })
        });



        console.log('obj...');
        axios.get('http://localhost:8081/objednavka', {
            params: JSON.stringify(parametre)
        }).then(response => this.ukoncenaObjednavka(response)
        ).catch(function (error) {
            console.log(error);
        })
    }

    ukoncenaObjednavka(response) {
        console.log(response.data);
        if (response.data.status && response.data.status === 'ok') {
            this.props.zmenScenu('thankYouPage', { objednavka_id: response.data.objednavka_id });
        } else {
            alert('vyskytla sa chyba pri vytvarani objednavky');
        }
    }

    render() {
        return (
            <React.StrictMode>
                <button className="naspat" onClick={() => this.props.zmenScenu('produktPage', 0)}><i class="fas fa-arrow-left"></i> Späť </button>
                <div className="kosik">
                    {this.kosik.map(produkt => (
                        <KosikProdukt
                            key={produkt.id}
                            produkt={produkt}
                        />
                    ))}
                    <div className="suma">Cena spolu: {this.suma.toFixed(2)}&euro;</div>
                </div>


                <form className="osobneUdaje" onSubmit={this.vytvorObjednavku}>
                    <label className="label-input">
                        Meno:
                    <input type="text" value={this.state.meno} onChange={e => this.setState({ meno: e.target.value })} name="meno" />
                    </label>

                    <label className="label-input">
                        Ulica:
                    <input type="text" value={this.state.ulica} onChange={e => this.setState({ ulica: e.target.value })} name="ulica" />
                    </label>

                    <label className="label-input">
                        Číslo domu:
                    <input type="text" value={this.state.cisloDomu} onChange={e => this.setState({ cisloDomu: e.target.value })} name="cisloDomu" />
                    </label>

                    <label className="label-input">
                        Mesto:
                    <input type="text" value={this.state.mesto} onChange={e => this.setState({ mesto: e.target.value })} name="mesto" />
                    </label>

                    <label className="label-input">
                        PSČ:
                    <input type="text" value={this.state.psc} onChange={e => this.setState({ psc: e.target.value })} name="psc" />
                    </label>

                    <input type="submit" className="vytvor-objednavku" value="Vytvoriť objednávku" />
                </form>

            </React.StrictMode >
        )
    }
}
export default OrderPage;
