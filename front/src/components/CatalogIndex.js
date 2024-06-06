
import React, { useState, useEffect } from 'react';

import Dish from './Dish'
import Category from './Category'
import AntiTag from './AntiTag'

function CatalogIndex() {
  const [dishes, setDishes] = useState([]);
  
  const [categories, setCategories] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  
  const [antiTags, setAntiTags] = useState([]);
  const [antiTagsFilter, setAntiTagsFilter] = useState([]);

  useEffect(() => {
    let url = 'http://localhost/api/v1/catalog'
    
    let params = []

    if (categoriesFilter.length > 0) {
      params.push(`categories=${categoriesFilter.join(',')}`)
    }

    if (antiTagsFilter.length > 0) {
      let ids = antiTagsFilter.join(',');
      params.push(`anti_tags=${ids}`)
    }
    
    if (params.length > 0) {
      url = url + '?' + params.join('&');
    }

    fetch(url)
         .then((response) => response.json())
         .then((data) => {

            setAntiTags(data.anti_tag)
            setDishes(data.dishes);
            
            let cats = [];

            data.dishes.forEach((dish) => {

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

  }, [categoriesFilter, antiTagsFilter]);

  let dishesList = [];

  dishes.forEach((dish, index) => {

    dishesList.push(<Dish dish={dish}/>)
  });

  let categoriesList = [];

  function toggleCategory(id) {

    let idx = categoriesFilter.indexOf(id)
    if (idx === -1) {
      setCategoriesFilter([...categoriesFilter, id])
    } else {
      let cats = [...categoriesFilter.slice(0, idx), ...categoriesFilter.slice(idx + 1)]
      setCategoriesFilter(cats)
    } 
  }

  categories.forEach((category, index) => {
    console.log('category', category, categoriesFilter, categoriesFilter.indexOf(category.id) > -1)
    categoriesList.push(<Category category={category} selected={categoriesFilter.indexOf(category.id) > -1} toggleCategory={toggleCategory} />)
  });

  function toggleTag(id) {
    let idx = antiTagsFilter.indexOf(id)
    if (idx === -1) {
      setAntiTagsFilter([...antiTagsFilter, id])
    } else {
      let cats = [...antiTagsFilter.slice(0, idx), ...antiTagsFilter.slice(idx + 1)]
      setAntiTagsFilter(cats)
    } 
  }

  let antiTagsList = []
  antiTags.forEach((tag, index) => {
    antiTagsList.push(<AntiTag tag={tag} selected={antiTagsFilter.indexOf(tag.id) > -1} toggleTag={toggleTag} />)
  })

  return (
    <div className="CatalogIndex">
      <h1>зоЖник</h1>
        <div id='categoriesMenu'>
          { categoriesList }
        </div>

        <div id='tagsMenu'>
          Исключить: { antiTagsList }
        </div>
        
        <div id="CatalogList">
          { dishesList }
        </div>

    </div>
  );
}

export default CatalogIndex;
