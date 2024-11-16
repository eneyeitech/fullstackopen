const Header = (prop) => {
  return (
    <>
      <h1>{prop.course}</h1>
    </>
  );
};

const Content = (prop) => {
  return (
    <>
      <p>
        {prop.part1} {prop.exercises1}
      </p>
      <p>
        {prop.part2} {prop.exercises2}
      </p>
      <p>
        {prop.part3} {prop.exercises3}
      </p>
    </>
  );
};

const Total = (prop) => {
  return (
    <>
      <p>Number of exercises {prop.exercises1 + prop.exercises2 + prop.exercises3}</p>
    </>
  )
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total exercises1={exercises1}
      exercises2={exercises2}
      exercises3={exercises3}
      />
      
    </div>
  );
};

export default App;
