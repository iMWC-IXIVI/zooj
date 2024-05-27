import React, { useState, useEffect } from 'react';

import Dish from './Dish'

function CatalogIndex() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch('http://localhost/api/v1/catalog')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setDishes(data.Dishes);
         })
         .catch((err) => {
            console.log(err.message);
         });
  }, []);

  let dishesList = [];

  dishes.forEach((dish, index) => {
    dishesList.push(<Dish dish={dish}/>)
  })

  return (
    <div className="CatalogIndex">
      <h1>Каталог</h1>
        { dishesList }
      {}
    </div>
  );
}

export default CatalogIndex;
