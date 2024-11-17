import { useState } from "react";

const Feedback = ({onGoodClick, onNeutralClick, onBadClick}) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={onGoodClick}/>
      <Button text="neutral" onClick={onNeutralClick}/>
      <Button text="bad" onClick={onBadClick}/>
    </>
  );
};

const Statistics = ({good, neutral, bad}) => {
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  );
};

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodClick = () => () => (
    setGood(good + 1)
  );

  const neutralClick = () => () => (
    setNeutral(neutral + 1)
);

  const badClick = () => () => (
    setBad(bad + 1)
  );

  return (
    <div>
      <Feedback onGoodClick={goodClick()} onNeutralClick={neutralClick()} onBadClick={badClick()}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
};

export default App;
