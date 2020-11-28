const assert = require('assert');
const axios = require('axios');

const teraz = Date.now();

describe("Get produkt - Jahoda", function () {
    const ocakavanaOdpoved = {
        nazov: 'Jahoda',
        obrazok: 'https://image.shutterstock.com/image-photo/strawberry-ice-cream-ball-isolated-600w-510947623.jpg',
        cena: 1.09
    }

    var jahoda = {};

    before(async () => {
        return result = await axios('http://localhost:8081/produkty')
            .then(function (response) {
                response.data.forEach(produkt => {
                    if (produkt.nazov == 'Jahoda') {
                        jahoda = produkt;
                    }
                })
            }).catch(function (error) {
                console.log(error);
                assert.fail(error);
            });
    });

    it('Názov', () => {
        assert.equal(jahoda.nazov, ocakavanaOdpoved.nazov);
    })

    it('Cena', () => {
        assert.equal(jahoda.cena, ocakavanaOdpoved.cena);
    })

    it('Obrázok', () => {
        assert.equal(jahoda.obrazok, ocakavanaOdpoved.obrazok);
    })
});

describe("Vytvor objednávku - jeden produkt", function () {
    const parametre = {
        meno: 'Test vytvor objednavku - jeden produkt (' + teraz + ')',
        mesto: 'Bratislava',
        cisloDomu: '2',
        psc: '12345',
        ulica: 'Ilkovičova',
        kosik: [{
            pocet: 3,
            id: 1
        }]
    };

    var response = {};

    before(async () => {
        return result = await axios.get('http://localhost:8081/objednavka', {
            params: JSON.stringify(parametre)
        }).then(function (res) {
            response = res;
        }).catch(function (error) {
            console.log(error);
        })
    });

    it('Response od servera', () => {
        assert.notStrictEqual(response.data, undefined);
    })

    it('Vytvorená', () => {
        assert.equal(response.data.status, 'ok');
    })

});

describe("Vytvor objednávku - viac produktov", function () {
    const parametre = {
        meno: 'Test vytvor objednavku - viac produktov (' + teraz + ')',
        mesto: 'Bratislava',
        cisloDomu: '2',
        psc: '12345',
        ulica: 'Ilkovičova',
        kosik: [{
            pocet: 3,
            id: 1
        },
        {
            pocet: 4,
            id: 2
        },
        {
            pocet: 10,
            id: 3
        }]
    };

    var response = {};

    before(async () => {
        return result = await axios.get('http://localhost:8081/objednavka', {
            params: JSON.stringify(parametre)
        }).then(function (res) {
            response = res;
        }).catch(function (error) {
            console.log(error);
        })
    });

    it('Response od servera', () => {
        assert.notStrictEqual(response.data, undefined);
    })

    it('Vytvorená', () => {
        assert.equal(response.data.status, 'ok');
    })

});

describe("Test duplikát zákazníka", function () {
    const parametre = {
        meno: 'Test duplikát zákazníka (' + teraz + ')',
        mesto: 'Bratislava',
        cisloDomu: '2',
        psc: '12345',
        ulica: 'Ilkovičova',
        kosik: [{
            pocet: 3,
            id: 1
        },
        {
            pocet: 4,
            id: 2
        },
        {
            pocet: 10,
            id: 3
        }]
    };


    it('Zákazník ešte nexistuje', async () => {
        return result = await axios.get('http://localhost:8081/existuje', {
            params: {
                meno: parametre.meno
            }
        }).then(function (res) {
            assert.equal(res.data.existuje.toString(), false.toString());
        }).catch(function (error) {
            console.log(error);
        })
    })



    it('Objednávka vytvorená', async () => {
        return result = await axios.get('http://localhost:8081/objednavka', {
            params: JSON.stringify(parametre)
        }).then(function (res) {
            assert.equal(res.data.status, 'ok');
        }).catch(function (error) {
            console.log(error);
        })

    })

    it('Zákazník už existuje', async () => {
        return result = await axios.get('http://localhost:8081/existuje', {
            params: {
                meno: parametre.meno
            }
        }).then(function (res) {
            assert.equal(res.data.existuje.toString(), true.toString());
        }).catch(function (error) {
            console.log(error);
        })
    })

});