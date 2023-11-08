export default function Die({ die, selectDie }) {
  // Render a single die with its value and selection state
  return (
    <article
      className={`die ${die.isSelected ? "die--selected" : ""}`}
      onClick={selectDie}
    >
      <div className={`number number${die.value}`}></div>
    </article>
  );
}
