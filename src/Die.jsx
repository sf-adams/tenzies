export default function Die({ die, selectDie }) {
  return (
    <article
      className={`die ${die.isSelected === true ? "die--selected" : ""}`}
      onClick={() => selectDie(die.id)}
    >
      <p className="die__num">{die.value}</p>
    </article>
  );
}
