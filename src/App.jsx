import "./App.css";
import Die from "./Die";

function App() {
  const values = ["3", "5", "2", "1", "1", "4", "3", "6", "3", "1"];
  return (
    <main>
      <div className="dice">
        {values.map((value) => {
          return (
            <Die value={value} />
          )
        })}
      </div>
    </main>
  );
}

export default App;
