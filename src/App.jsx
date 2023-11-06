import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState([]);

  // Initialise the dice array
  const initialiseDice = () => {
    let valuesArray = [];
    const numDice = 10
    for (let i = 0; i < numDice; i++) {
      valuesArray.push({
        id: i + 1,
        value: Math.ceil(Math.random() * 6).toString(),
        isSelected: false,
      });
    }
    setDice(valuesArray);
  };

  // Create the dice array on load
  useEffect(() => {
    initialiseDice();
  }, []);

  // Roll the dice
  const rollDice = () => {
    setDice((prevDice) => {
      return prevDice.map((prevDie) => {
        if (!prevDie.isSelected) {
          return {
            ...prevDie,
            value: Math.ceil(Math.random() * 6).toString(),
          };
        }
        return prevDie;
      });
    });
  };

  // Select die
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

  return (
    <main>
      <div className="dice">
        {dice.map((die) => {
          return <Die key={die.id} die={die} selectDie={selectDie} />;
        })}
      </div>
      {dice.some((die) => die.isSelected === false) ? (
        <button className="roll" onClick={rollDice}>
          Roll
        </button>
      ) : (
        <button className="roll" onClick={initialiseDice}>
          Start Again
        </button>
      )}
    </main>
  );
}

export default App;
