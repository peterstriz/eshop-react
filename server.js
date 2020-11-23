const mysql = require('mysql');
const express = require('express');
const { response } = require('express');

const app = express();


var polozky = [{
    'nazov': 'Jahoda',
    'cena': 1.09,
    'obrazok': 'https://image.shutterstock.com/image-photo/strawberry-ice-cream-ball-isolated-600w-510947623.jpg'
}, {
    'nazov': 'Čokoláda',
    'cena': 0.99,
    'obrazok': 'https://image.shutterstock.com/image-photo/chocolate-ice-cream-scoop-top-600w-131524841.jpg'

}, {
    'nazov': 'Mango',
    'cena': 1.49,
    'obrazok': 'https://image.shutterstock.com/image-photo/close-on-scoop-tasty-orange-600w-595746428.jpg'
}, {
    'nazov': 'Extra poleva',
    'cena': 0.44,
    'obrazok': 'https://image.shutterstock.com/image-photo/melted-dark-chocolate-swirl-background-600w-1655863732.jpg'
}
]

var reklama = [{
    'nazov': 'FIIT',
    'obrazok': 'https://www.fiit.stuba.sk/buxus/images/top_banner/banner_fiit_3.jpg',
    'url': 'https://www.fiit.stuba.sk/'
}, {
    'nazov': 'FEI',
    'obrazok': 'https://www.fei.stuba.sk/buxus/images/top_banner/image_5539_57_v1.gif',
    'url': 'https://www.fei.stuba.sk/'
}
]

function vytvorenieDatabazy() {
    var query = 'DROP DATABASE IF EXISTS eshop;';
    var query2 = 'CREATE DATABASE IF NOT EXISTS eshop ;';

    connection.query(query2, function (error, results, fields) {
        if (error) throw error;
        console.log('Vytvorenie databazy');
        console.log(results);
    });

}


function seedovanieProdukt() {
    var query = 'INSERT INTO produkt (nazov, cena, obrazok) VALUES '

    var mapovanePolozky = polozky.map(e => {
        return '(\'' + e.nazov + '\', \'' + e.cena + '\', \'' + e.obrazok + '\')'
    })

    query += mapovanePolozky.join(', ') + ';';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('Seed produkt uspesny');
    });
}


function seedovanieReklama() {
    var query = 'INSERT INTO reklama (nazov, url, obrazok) VALUES '

    var mapovanePolozky = reklama.map(e => {
        return '(\'' + e.nazov + '\', \'' + e.url + '\', \'' + e.obrazok + '\')'
    })

    query += mapovanePolozky.join(', ') + ';';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('Seed reklama uspesny');
    });
}



var connection = mysql.createConnection({
    host: 'mydb',
    user: 'root',
    password: 'root',
    database: 'eshop',
    multipleStatements: true
});


app.get('/produkty', (req, res) => {
    res.header({ "Access-Control-Allow-Origin": "*" });

    console.log("requested produkty");

    var query = 'SELECT * FROM `produkt`;'

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});


app.get('/pocitadlo', (req, res) => {
    res.header({ "Access-Control-Allow-Origin": "*" });

    console.log("requested pocitadlo reklama");


    var query = 'UPDATE reklama SET pocet_klikov = pocet_klikov + 1 WHERE id= \'' + req.query.id + '\';'

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.json({ ok: 'klik registrovany' });
    });
});


app.get('/reklama', (req, res) => {
    res.header({ "Access-Control-Allow-Origin": "*" });

    console.log("requested reklama");

    var query = 'SELECT * FROM `reklama`;'

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        const reklama = results[Math.floor(Math.random() * results.length)];

        res.json(reklama);
    });
});


app.get('/existuje', (req, res) => {
    res.header({ "Access-Control-Allow-Origin": "*" });

    console.log("requested pouzivatel");
    console.log(req.query);


    var query = 'SELECT EXISTS(SELECT * FROM zakaznik WHERE meno = \'' + req.query.meno + '\') AS existuje';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('query..');
        console.log(results);
        results = { 'existuje': results[0].existuje == 0 ? false : true };
        res.json(results);
    });
});

app.get('/objednavka', (req, res) => {
    res.header({ "Access-Control-Allow-Origin": "*" });

    console.log("requested objednavka");
    console.log(req.query);

    const objednavka = JSON.parse(req.query[0]);

    connection.beginTransaction(function (err) {
        if (err) { throw err; }

        var sql = 'INSERT INTO `zakaznik` (`meno`, `ulica`, `cislo`, `mesto`, `psc`) ' +
            'VALUES (\'' + objednavka.meno + '\', \'' + objednavka.ulica + '\', \'' + objednavka.cisloDomu + '\', \'' + objednavka.mesto + '\', \'' + objednavka.psc + '\'); ';
        connection.query(sql, function (err, result) {
            if (err) {
                res.json({ fail: err });
                connection.rollback(function () {
                    throw err;
                });
            }
            var zakaznik_id = result.insertId;

            console.log('vytvoreny zakaznik');

            sql = 'INSERT INTO objednavka (zakaznik_id) VALUES (\'' + zakaznik_id + '\'); ';
            connection.query(sql, function (err, result) {
                if (err) {
                    res.json({ fail: err });
                    connection.rollback(function () {
                        throw err;
                    });
                }

                var objednavka_id = result.insertId;

                console.log('vytvorena objednavka');


                function mojeSql(pocet_produktov, produkt_id, objednavka_id) {
                    return 'INSERT INTO kosik (pocet_produktov, produkt_id, objednavka_id) VALUES (\'' + pocet_produktov + '\', \'' + produkt_id + '\', \'' + objednavka_id + '\'); ';
                }


                sql = '';
                objednavka.kosik.forEach(produkt => {
                    sql += mojeSql(produkt.pocet, produkt.id, objednavka_id);
                });

                connection.query(sql, function (err, result) {
                    if (err) {
                        res.json({ fail: err });
                        connection.rollback(function () {
                            throw err;
                        });
                    }

                    console.log('vytvorene vsetky objednavky');

                    connection.commit(function (err) {
                        if (err) {
                            res.json({ fail: err });
                            connection.rollback(function () {
                                throw err;
                            });
                        }
                        console.log('success commit');

                        res.json({
                            status: 'ok',
                            objednavka_id: objednavka_id
                        });
                    });

                });

            });
        });
    });
});



app.listen(8081, () => {


    console.log('Waiting for database init... (5 sec)');
    // setTimeout(function () { 
    connection.connect();// }, 5000);
    console.log('Server listening...');




    seedovanieProdukt();
    seedovanieReklama();

    vytvorenieDatabazy();
});




