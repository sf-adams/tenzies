import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState([]);

  const allNewDice = () => {
    let valuesArray = [];
    for (let i = 0; i < 10; i++) {
      valuesArray.push({
        id: i + 1,
        value: Math.ceil(Math.random() * 6).toString(),
        isSelected: false,
      });
    }
    setDice(valuesArray);
  };

  useEffect(() => {
    allNewDice();
  }, []);

  const selectDie = (id) => {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return {
          ...die,
          isSelected: id === die.id ? !die.isSelected : die.isSelected,
        };
      })
    );
  };

  console.log(dice);

  return (
    <main>
      <div className="dice">
        {dice.map((die) => {
          return <Die key={die.id} die={die} selectDie={selectDie} />;
        })}
      </div>
      <button className="roll" onClick={allNewDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
