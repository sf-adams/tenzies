import { useEffect, useState } from "react";
import "./App.css";
import DieIcon from "./assets/die.svg";
import Confetti from "react-confetti";
import Die from "./components/Die";
import Timer from "./components/Timer";

function App() {
  const [dice, setDice] = useState([]);
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [time, setTime] = useState(60);

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
    setRollCount(0);
    setTime(60);
  };

  // Initialise the dice array when the component loads
  useEffect(() => {
    initialiseDice();
  }, []);

  // Check to see if the user has won when dice array updated
  useEffect(() => {
    const allNumbers = dice.every((die) => die.value === dice[0].value);
    const allSelected = dice.every((die) => die.isSelected);

    if (dice.length > 1 && allNumbers && allSelected) {
      setTenzies(true);
      highScore();
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
    setRollCount((prevCount) => prevCount + 1);
  };

  // Function to select or deselect a die by its ID
  const selectDie = (id) => {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isSelected: !die.isSelected } : die;
      })
    );
  };

  // Function to get or set high score
  const highScore = () => {
    const currentScore = 60 - time;
    const currentBest = sessionStorage.getItem("time");

    if (currentBest === null || currentScore < currentBest) {
      sessionStorage.setItem("time", currentScore);
      console.log(
        `You took ${currentScore} seconds! \nYour new best time is ${currentScore} seconds!`
      );
    } else {
      console.log(
        `You took ${currentScore} seconds! \nYour best time remains ${currentBest} seconds!`
      );
    }
  };

  return (
    <main>
      <header>
        <div className="roll-count">
          <img src={DieIcon} alt="" />
          <div>{rollCount}</div>
        </div>
        <Timer time={time} setTime={setTime} tenzies={tenzies} />
      </header>
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
