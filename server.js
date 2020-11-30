const mysql = require('mysql');
const express = require('express');

const app = express();

const nazovDatabazy = 'eshop';

var connection = {};


function vytvorenieDatabazy() {
    var sql = 'SHOW DATABASES LIKE \'' + nazovDatabazy + '\';'

    connection.query(sql, function (error, results, fields) {
        // console.log('Vytvorenie databazy');
        // console.log(results);
        if (error)
            console.log(error);

        if (results.length == 0) {
            console.log('Treba vytvorit DB...');

            var vytvorQuery = 'CREATE DATABASE ' + nazovDatabazy + ';';
            connection.query(vytvorQuery, function (error, results, fields) {
                console.log('DB vytvorena');

                if (error) throw error;

                connection.end();

                connection = mysql.createConnection({
                    host: 'mydb',
                    user: 'root',
                    password: 'root',
                    database: nazovDatabazy,
                    multipleStatements: true
                });

                connection.connect();

                console.log('Pripojeny na DB');

                console.log('Vytvaram tabulky...');
                connection.query(databazaCreate, function (error, results, fields) {
                    console.log(results);
                    console.log(error);
                    console.log('Tabulky vytvorene');


                    seedovanieProdukt();
                    seedovanieReklama();
                });


            });


        }
        else if (error) {
            throw error;
        }
        else {
            connection.end();

            connection = mysql.createConnection({
                host: 'mydb',
                user: 'root',
                password: 'root',
                database: nazovDatabazy,
                multipleStatements: true
            });

            connection.connect();
            console.log('Pripojeny na databazu... eshop');
        }

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


app.get('/produkty', (req, res) => {
    res.header({ "Access-Control-Allow-Origin": "*" });

    console.log("requested produkty");

    var query = 'SELECT * FROM `produkt`;'

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/reklamy', (req, res) => {
    res.header({ "Access-Control-Allow-Origin": "*" });

    console.log("requested reklamy");

    var query = 'SELECT * FROM `reklama`;'

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/objednavky', (req, res) => {
    res.header({ "Access-Control-Allow-Origin": "*" });

    console.log("requested objednavky");

    var query = 'SELECT objednavka.id, zakaznik.meno, zakaznik.ulica, zakaznik.cislo, zakaznik.mesto, zakaznik.psc, kosik.pocet_produktov, ROUND((kosik.pocet_produktov*produkt.cena), 2) AS suma, produkt.nazov, produkt.obrazok, produkt.cena, objednavka.stav FROM objednavka'
        + ' INNER JOIN zakaznik ON objednavka.zakaznik_id=zakaznik.id'
        + ' INNER JOIN kosik ON kosik.objednavka_id=objednavka.id'
        + ' INNER JOIN produkt ON kosik.produkt_id=produkt.id'
        + ' ORDER BY objednavka.id;'


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

app.get('/spracujObjednavku', (req, res) => {
    res.header({ "Access-Control-Allow-Origin": "*" });

    console.log("requested update stav objednavky");


    var query = 'UPDATE objednavka SET stav = \'spracovana\' WHERE id= \'' + req.query.id + '\';'

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log(results);

        if (results.changedRows >= 1)
            res.json({ stav: 'spracovana' });
        else
            res.json({ stav: 'fail' });
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
                if (err.code != 'ER_DUP_ENTRY') {
                    res.json({ fail: err });
                    connection.rollback(function () {
                        throw err;
                    });
                }
            }
            // var zakaznik_id = result.insertId;

            console.log('vytvoreny zakaznik');

            sql = 'INSERT INTO objednavka (zakaznik_id, stav) VALUES ((SELECT id FROM zakaznik WHERE meno=\'' + objednavka.meno + '\'), \'vytvorena\'); ';
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


spojSaSDatabazou(() => {
    vytvorenieDatabazy();

    app.listen(8081, () => {
        console.log('Server listening...');
    });

});



function spojSaSDatabazou(callback) {

    connection = mysql.createConnection({
        host: 'mydb',
        user: 'root',
        password: 'root',
        multipleStatements: true
    });

    connection.connect(err => {
        if (err) {
            console.log("Databaza nebola najdena, skusim o 20 sekund...");
            connection.end(err => {
                console.log("Zrusit spojenie sa nepodarilo!");
            });
            setTimeout(() => {
                spojSaSDatabazou(callback);
            }, 20000);
        }
        else {
            console.log("Spojenie s databazou nadviazane");
            callback();
        }
    });
}



var databazaCreate =
    'SET NAMES utf8; '
    + ' SET time_zone = \'+00:00\'; '
    + ' SET foreign_key_checks = 0; '
    + ' SET sql_mode = \'NO_AUTO_VALUE_ON_ZERO\'; '

    + ' DROP TABLE IF EXISTS `kosik`;'
    + ' CREATE TABLE `kosik` ('
    + '   `id` int unsigned NOT NULL AUTO_INCREMENT,'
    + '   `pocet_produktov` int unsigned NOT NULL,'
    + '   `produkt_id` int unsigned NOT NULL,'
    + '   `objednavka_id` int unsigned NOT NULL,'
    + '   PRIMARY KEY (`id`),'
    + '   KEY `produkt_id` (`produkt_id`),'
    + '   KEY `objednavka_id` (`objednavka_id`),'
    + '   CONSTRAINT `kosik_ibfk_1` FOREIGN KEY (`produkt_id`) REFERENCES `produkt` (`id`),'
    + '   CONSTRAINT `kosik_ibfk_2` FOREIGN KEY (`objednavka_id`) REFERENCES `objednavka` (`id`)'
    + ' ) ENGINE=InnoDB DEFAULT CHARSET=utf8;'


    + ' DROP TABLE IF EXISTS `objednavka`;'
    + ' CREATE TABLE `objednavka` ('
    + '   `id` int unsigned NOT NULL AUTO_INCREMENT,'
    + '   `zakaznik_id` int unsigned NOT NULL,'
    + '   `stav` varchar(10) NOT NULL,'
    + '   PRIMARY KEY (`id`),'
    + '   KEY `zakaznik_id` (`zakaznik_id`),'
    + '   CONSTRAINT `objednavka_ibfk_1` FOREIGN KEY (`zakaznik_id`) REFERENCES `zakaznik` (`id`)'
    + ' ) ENGINE=InnoDB DEFAULT CHARSET=utf8;'


    + ' DROP TABLE IF EXISTS `produkt`;'
    + ' CREATE TABLE `produkt` ('
    + '   `id` int unsigned NOT NULL AUTO_INCREMENT,'
    + '   `nazov` varchar(30) NOT NULL,'
    + '   `obrazok` tinytext NOT NULL,'
    + '   `cena` double NOT NULL,'
    + '   PRIMARY KEY (`id`)'
    + ' ) ENGINE=InnoDB DEFAULT CHARSET=utf8;'

    + ' DROP TABLE IF EXISTS `reklama`;'
    + ' CREATE TABLE `reklama` ('
    + '   `id` int unsigned NOT NULL AUTO_INCREMENT,'
    + '   `pocet_klikov` int unsigned NOT NULL DEFAULT \'0\','
    + '   `nazov` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,'
    + '   `url` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,'
    + '   `obrazok` tinytext NOT NULL,'
    + '   PRIMARY KEY (`id`)'
    + ' ) ENGINE=InnoDB DEFAULT CHARSET=utf8;'


    + ' DROP TABLE IF EXISTS `zakaznik`;'
    + ' CREATE TABLE `zakaznik` ('
    + '   `id` int unsigned NOT NULL AUTO_INCREMENT,'
    + '   `meno` varchar(70) NOT NULL,'
    + '   `ulica` varchar(50) NOT NULL,'
    + '   `cislo` int NOT NULL,'
    + '   `mesto` varchar(50) NOT NULL,'
    + '   `psc` int NOT NULL,'
    + '   PRIMARY KEY (`id`)'
    + ' ) ENGINE=InnoDB DEFAULT CHARSET=utf8;'

    + 'ALTER TABLE `zakaznik` ADD UNIQUE (`meno`);'

    + ' INSERT INTO `zakaznik` (`id`, `meno`, `ulica`, `cislo`, `mesto`, `psc`) VALUES'
    + ' (1,	\'admin\',	\'Iklovičova\',	2,	\'BA\',	12345);'



var polozky = [{
    'nazov': 'Jahoda',
    'cena': 1.09,
    'obrazok': 'https://image.shutterstock.com/image-photo/strawberry-ice-cream-ball-isolated-600w-510947623.jpg'
}, {
    'nazov': 'Čučoriadka',
    'cena': 1.19,
    'obrazok': 'https://image.shutterstock.com/image-photo/single-blueberry-ice-cream-scoop-600w-203261278.jpg'
}, {
    'nazov': 'Stracciatella',
    'cena': 0.99,
    'obrazok': 'https://image.shutterstock.com/image-photo/speciality-italian-stracciatella-ice-cream-600w-599396960.jpg'
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