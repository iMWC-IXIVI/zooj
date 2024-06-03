import React, { useState, useEffect } from "react";

<<<<<<< HEAD
import Dish from "./Dish";
=======
import Dish from './Dish'
import Category from './Category'
>>>>>>> catalog-categories-frontend

function CatalogIndex() {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([])

  useEffect(() => {
<<<<<<< HEAD
    fetch("http://localhost/api/v1/catalog")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDishes(data.Dishes);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
=======
    let url = 'http://localhost/api/v1/catalog'
    if (categoriesFilter.length > 0) {
      url = url + '?';
    }
    console.log("mama: ", categoriesFilter)
    categoriesFilter.forEach((id) => {
      url = url + 'categories[]=' + id
    })

    fetch(url)
         .then((response) => response.json())
         .then((data) => {
            setDishes(data.Dishes);
            
            let cats = [];

            data.Dishes.forEach((dish) => {
              dish.categories.forEach((category) => {
                for (let i = 0; i < cats.length; i++) {
                  if (cats[i].id === category.id) {
                    return
                  }
                }
  
                cats.push(category)
              });
            });

            setCategories(cats);
         })
         .catch((err) => {
            console.log(err.message);
         });
  }, [categoriesFilter]);
>>>>>>> catalog-categories-frontend

  let dishesList = [];

  dishes.forEach((dish, index) => {
<<<<<<< HEAD
    dishesList.push(<Dish dish={dish} />);
=======
    dishesList.push(<Dish dish={dish}/>)
  });

  let categoriesList = [];

  function toggleCategory(id) {
    setCategoriesFilter([...categoriesFilter, id])
  }

  categories.forEach((category, index) => {
    categoriesList.push(<Category category={category} toggleCategory={toggleCategory} />)
>>>>>>> catalog-categories-frontend
  });

  return (
    <div className="CatalogIndex">
      
      <h1>Каталог</h1>
<<<<<<< HEAD
      {dishesList}
=======
        <h2>Категории</h2>
        { categoriesList }
        
        { dishesList }
>>>>>>> catalog-categories-frontend
      {}
    </div>
  );
}

export default CatalogIndex;
