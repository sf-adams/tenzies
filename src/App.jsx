import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState([]);
  const [tenzies, setTenzies] = useState(false);

  // Function to initialise the dice array with 10 dice
  const initialiseDice = () => {
    const numDice = 10; // The number of dice to initialise
    const initialDiceState = [];
    for (let i = 0; i < numDice; i++) {
      initialDiceState.push({
        id: i + 1,
        value: Math.ceil(Math.random() * 6).toString(),
        isSelected: false,
      });
    }
    setDice(initialDiceState); // Set the initial state with the dice array
  };

  const resetGame = () => {
    initialiseDice();
    setTenzies(false);
  }

  // Initialise the dice array when the component loads
  useEffect(() => {
    initialiseDice();
  }, []);

  // Check to see if the user has won when dice array updated
  useEffect(() => {
    const allNumbers = dice.every((die) => die.value === dice[0].value);
    const allSelected = dice.every((die) => die.isSelected === true);

    if (allNumbers && allSelected) {
      setTenzies((prevTenzies) => !prevTenzies);
    }
  }, [dice]);

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
        return die.id === id ? { ...die, isSelected: !die.isSelected } : die;
      })
    );
  };

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice">
        {dice.map((die) => {
          return (
            <Die key={die.id} die={die} selectDie={() => selectDie(die.id)} />
          );
        })}
      </div>
      {!tenzies ? (
        // Show "Roll" button when at least one die is not selected
        // Trigger re-roll
        <button className="roll" onClick={rollDice}>
          Roll
        </button>
      ) : (
        // Show "Start Again" button when all dice are selected
        // Trigger initialization
        <button className="roll" onClick={resetGame}>
          Start Again
        </button>
      )}
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
