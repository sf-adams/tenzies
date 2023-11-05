export default function Die(props) {
  return (
    <article className="die">
      <p className="die__num">{props.value}</p>
    </article>
  );
}
