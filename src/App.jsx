import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";

function App() {
  // State to manage the dice array
  const [dice, setDice] = useState([]);

  // Function to initialise the dice array with 10 dice
  const initialiseDice = () => {
    const numDice = 10; // The number of dice to initialise
    const valuesArray = [];
    for (let i = 0; i < numDice; i++) {
      valuesArray.push({
        id: i + 1,
        value: Math.ceil(Math.random() * 6).toString(),
        isSelected: false,
      });
    }
    setDice(valuesArray); // Set the initial state with the dice array
  };

  // Initialise the dice array when the component loads
  useEffect(() => {
    initialiseDice();
  }, []);

  // Function to roll a single die
  const rollDie = (die) => ({
    ...die,
    value: Math.ceil(Math.random() * 6).toString(),
  });

  // Function to roll all the dice that are not selected
  const rollDice = () => {
    setDice((prevDice) => {
      return prevDice.map((prevDie) => {
        return !prevDie.isSelected ? rollDie(prevDie) : prevDie;
      });
    });
  };

  // Function to select or deselect a die by its ID
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
        // Show "Roll" button when at least one die is not selected
        // Trigger re-roll
        <button className="roll" onClick={rollDice}>
          Roll
        </button>
      ) : (
        // Show "Start Again" button when all dice are selected
        // Trigger initialization
        <button className="roll" onClick={initialiseDice}>
          Start Again
        </button>
      )}
    </main>
  );
}

export default App;
