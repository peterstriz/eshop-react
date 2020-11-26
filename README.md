# Eshop VAJVS - Peter Stríž

Node server:  ```http://localhost:8081/```

Adminer: ```http://localhost:8080/```

Nazov databazy: ```eshop```

React server: ```http://localhost:3000/```

(Treba mať vypnutý adblocker v prehliadači, inak sa niektoré funkcie nemusia zobraziť správne)


## Spustenie

Treba použiť dve konzoly naraz, lebo jedna ovláda server a docker, zatiaľ čo druhá react

Príkazy môžeme spúšťať súbežne

1. Konzola
```
docker-compose build
docker-compose up
(počkať pokiaľ sa načíta mysql databáza -> zrušiť CTRL+C)
docker-compose up 
```
2. Konzola
```
cd ./my-app/
npm install
npm start
```


## Databaza

![Obrazok schemy](dokumentacia/schema.png)
