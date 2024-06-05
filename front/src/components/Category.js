import React from "react";

function Category({category, toggleCategory}) {
    function switchCategory() {
        toggleCategory(category.id)
    }

    return (
      <div className="category">
        <div onClick={switchCategory}>{category.title}</div>
      </div>
    );
  }
  
  export default Category;
  