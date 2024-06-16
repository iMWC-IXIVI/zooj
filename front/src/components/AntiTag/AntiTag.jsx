import classes from "./AntiTag.module.scss";

export default function Tag({ tag, selected, toggleTag }) {
  function switchTag() {
    toggleTag(tag.id);
  }
  return (
    <div className={(classes.tag) + " " + (selected ? (classes.red) : (classes.black))} onClick={switchTag}>
      {tag.title}
    </div>
  );
}