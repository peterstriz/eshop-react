import './ProduktPage.css';
import Produkt from './Produkt';
import axios from 'axios';

import React, { useState, useEffect } from 'react';

function Produkty(props) {
  const [produkty, setProdukty] = useState([]);


  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const result = await axios('http://localhost:8081/produkty');

      if (mounted)
        setProdukty(result.data);
    }


    fetchData();

    return () => mounted = false;
  }, []);

  function zobrazProdukty() {
    if (produkty.length == 0)
      return <div>ERROR: Uistite sa že node.js server je zapnutý</div>

    return produkty.map(produkt => (
      <Produkt
        key={produkt.id}
        udaje={produkt}
        pridajDoKosika={function (produkt) { props.pridajDoKosika(produkt) }}
        odoberZKosika={function (produkt) { props.odoberZKosika(produkt) }}
      />
    ))
  }

  return (
    <div className="produkty">
      {zobrazProdukty()}

    </div>
  );
}

export default Produkty;
