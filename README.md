# Eshop - VAJVS - Peter Stríž

React frontend: ```http://localhost:3000/```

Node server:  ```http://localhost:8081/```

Adminer: ```http://localhost:8080/```

Názov databázy: ```eshop```

(Treba mať vypnutý adblocker v prehliadači, inak sa niektoré funkcie nemusia zobraziť správne)

## Admin

Ak chceme ísť na admin stánku, musíme zadať: ```http://localhost:3000/#admin``` (je potrebné refreshnúť stránku)

Obsah objednávky sa zobrazí po nabehnutí myšou nad objednávku

## Spustenie

Treba použiť dve konzoly naraz, lebo jedna rieši Docker, zatiaľ čo tá druhá React

Príkazy môžeme spúšťať súbežne

1. Konzola - *Node server, Adminer, Databáza*
```
docker-compose build
docker-compose up
(ak náhodou node server padne - nemal by, tak stači iba znovu zadať)
docker-compose up 
```
2. Konzola - *React*
```
cd ./my-app/
(iba pri prvom spustení)
npm install
npm start
```

## Testy

Treba mať spustený node server a v root priečinku stačí spustiť:

```
npm install 
npm test
```

**ALEBO**

Ak sme priamo v docker containeri, tak stačí iba:
```
npm test
```


## Databáza

![Obrazok schemy](dokumentacia/schema.png)
