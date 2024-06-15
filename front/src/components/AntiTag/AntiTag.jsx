export default function Tag({ tag, selected, toggleTag }) {
  function switchTag() {
    toggleTag(tag.id);
  }
  return (
    <div className={"tag " + (selected ? "red" : "black")} onClick={switchTag}>
      {tag.title}
    </div>
  );
}