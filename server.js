const mysql = require('mysql');
const express = require('express');

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

function vytvorenieDatabazy() {
    var query = 'DROP DATABASE IF EXISTS eshop;';
    var query2 = 'CREATE DATABASE IF NOT EXISTS eshop ;';

    connection.query(query2, function (error, results, fields) {
        if (error) throw error;
        console.log('Vytvorenie databazy');
        console.log(results);
    });

}


function seedovanie() {
    var query = 'INSERT INTO produkt (nazov, cena, obrazok) VALUES '

    var mapovanePolozky = polozky.map(e => {
        return '(\'' + e.nazov + '\', \'' + e.cena + '\', \'' + e.obrazok + '\')'
    })

    query += mapovanePolozky.join(', ') + ';';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('Seed uspesny');
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
    console.log("requested produkty");

    res.header({ "Access-Control-Allow-Origin": "*" });

    var query = 'SELECT * FROM `produkt` LIMIT 50;'

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});


app.get('/existuje', (req, res) => {

    console.log("requested pouzivatel");
    console.log(req.query);


    res.header({ "Access-Control-Allow-Origin": "*" });

    var query = 'SELECT EXISTS(SELECT * FROM zakaznik WHERE meno = \'' + req.query.meno + '\') AS existuje';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('query..');
        console.log(results);
        results = { 'existuje': results[0].existuje == 0 ? false : true };
        res.json(results);
    });
});





app.listen(8081, () => {


    console.log('Waiting for database init... (5 sec)');
    // setTimeout(function () { 
    connection.connect();// }, 5000);
    console.log('Server listening...');




    seedovanie();

    vytvorenieDatabazy();
});




