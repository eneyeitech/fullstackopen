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

const StatisticLine = (props) => {
  return <tr><td>{props.text}</td><td>{props.value} {props.text === 'positive' && '%'}</td></tr>
}

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad;

  if(sum === 0){
    return (
      <h2>No feedback given</h2>
    )
  }

  return (
    <>
      <table>
        <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={sum}/>
      <StatisticLine text="average" value={(good - bad) / sum}/>
      <StatisticLine text="positive" value={(good / sum) * 100}/>
      </tbody>
      </table>
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
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
};

export default App;
