import './ProduktPage.css';
import Produkt from './Produkt';
import axios from 'axios';

import React, { useState, useEffect } from 'react';

function Produkty(props) {
  const [produkty, setProdukty] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:8081/produkty');

      setProdukty(result.data);
    }

    fetchData();
  }, []);

  return (
    <div className="produkty">
      {produkty.map(produkt => (
        <Produkt
          key={produkt.id}
          udaje={produkt}
          pridajDoKosika={function (produkt) { props.pridajDoKosika(produkt) }}
          odoberZKosika={function (produkt) { props.odoberZKosika(produkt) }}
        />
      ))}

    </div>
  );
}

export default Produkty;
