# Eshop - VAJVS - Peter Stríž

React frontend: ```http://localhost:3000/```

Node server:  ```http://localhost:8081/```

Adminer: ```http://localhost:8080/```

Názov databázy: ```eshop```

(Treba mať vypnutý adblocker v prehliadači, inak sa niektoré funkcie nemusia zobraziť správne)

## Admin

Ak chceme ísť na admin stánku, musíme zadať: ```http://localhost:3000/#admin``` (niekedy je potrebné adresu zavolať dvakrát)

## Spustenie

Treba použiť dve konzoly naraz, lebo jedna rieši Docker, zatiaľ čo tá druhá React

Príkazy môžeme spúšťať súbežne

1. Konzola - *Node server, Adminer, Databáza*
```
docker-compose build
docker-compose up
(ak náhodou node server padne tak treba znovu zadať)
docker-compose up 
```
2. Konzola - *React*
```
cd ./my-app/
npm install
npm start
```

## Testy

V root priečinku stačí spustiť:

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
