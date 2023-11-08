import { useEffect } from "react";
import Clock from "../assets/clock.svg";
import "./Timer.css";

export default function Timer({ time, setTime, tenzies }) {
  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0 && !tenzies) {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => {
      // Clean up the timer when the component unmounts
      clearInterval(timer);
    };
  }, [time]);

  const timeStyles = {
    color: time <= 10 ? "#d72638" : time <= 20 ? "#f5c638" : "#0b2434",
    // Apply the 'pulse' class when time is less than or equal to ten
    className: time <= 10 ? "pulse-animation" : "",
  };

  return (
    <div className="timer">
      <div style={timeStyles}>{time}</div>
      <img src={Clock} alt="Clock Icon" />
    </div>
  );
}
