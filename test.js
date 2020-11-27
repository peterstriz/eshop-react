const assert = require('assert');
const axios = require('axios');

describe("Get produkt - Jahoda", function () {
    const ocakavanaOdpoved = {
        nazov: 'Jahoda',
        obrazok: 'https://image.shutterstock.com/image-photo/strawberry-ice-cream-ball-isolated-600w-510947623.jpg',
        cena: 1.09
    }

    var jahoda = {};

    beforeEach(async () => {
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

    it('Nazov', () => {
        assert.equal(jahoda.nazov, ocakavanaOdpoved.nazov);
    })

    it('Cena', () => {
        assert.equal(jahoda.cena, ocakavanaOdpoved.cena);
    })

    it('Obrazok', () => {
        assert.equal(jahoda.obrazok, ocakavanaOdpoved.obrazok);
    })
});


describe("Vytvor objednavku - jeden produkt", function () {

    const parametre = {
        meno: 'Peter Stríž',
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

    beforeEach(async () => {
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

    it('Vytvorena', () => {
        assert.equal(response.data.status, 'ok');
    })

});

describe("Vytvor objednavku - viac produktov", function () {
    const parametre = {
        meno: 'Peter Stríž',
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

    beforeEach(async () => {
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

    it('Vytvorena', () => {
        assert.equal(response.data.status, 'ok');
    })

});

    // describe('Jahoda', function () {
    //     it('id', function () {
    //         assert.equal(jahoda.id, ocakavanaOdpoved.id);
    //     })
    // })



    // if ({
    //     cena: 1.09,
    //     id: 1,
    //     nazov: 'Jahoda',
    //     obrazok: 'https://image.shutterstock.com/image-photo/strawberry-ice-cream-ball-isolated-600w-510947623.jpg'
    // } == {
    //     cena: 1.09,
    //     id: 1,
    //     nazov: 'Jahoda',
    //     obrazok: 'https://image.shutterstock.com/image-photo/strawberry-ice-cream-ball-isolated-600w-510947623.jpg'
    // })
    //     console.log('wtf1');
    // else
    //     console.log('wtf2');

    // console.log(result.data);


/*it('Vytvor objednavku', function () {
    var parametre = {
        meno: 'Peter Stríž',
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
        }]
    };


    axios.get('http://localhost:8081/objednavka', {
        params: JSON.stringify(parametre)
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    })
});*/


