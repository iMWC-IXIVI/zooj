import classes from "./Category.module.scss";

export default function Category({ category, selected, toggleCategory }) {
  function switchCategory() {
    toggleCategory(category.id);
  }

  return (
    <div
      className={(classes.category) + " " + (selected ? (classes.green) : (classes.black))}
      onClick={switchCategory}
    >
      {category.title}
    </div>
  );
}