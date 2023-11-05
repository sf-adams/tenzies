import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState(allNewDice());

  const allNewDice = () => {
    let valuesArray = [];
    for (let i = 0; i < 10; i++) {
      valuesArray.push(Math.ceil(Math.random() * 6).toString());
    }
    return valuesArray;
  };

  return (
    <main>
      <div className="dice">
        {dice.map((diceValue, index) => {
          return <Die key={index} value={diceValue} />;
        })}
      </div>
      <button onClick={allNewDice}>Values</button>
    </main>
  );
}

export default App;
