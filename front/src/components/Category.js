import React from "react";

function Category({category, selected, toggleCategory}) {
    function switchCategory() {
        toggleCategory(category.id)
    }

    return (
      <div className={"category " + (selected ? 'green' : 'black') } onClick={switchCategory}>{category.title}</div>
    );
  }
  
  export default Category;
  