export default function Die({ die, selectDie }) {
  return (
    <article
      className={`die ${die.isSelected === true ? "die--selected" : ""}`}
      onClick={selectDie}
    >
      <p className="die__num">{die.value}</p>
    </article>
  );
}
