const Header = (props) => {
    return (
      <>
        <h1>{props.course.name}</h1>
      </>
    );
  };
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </>
    );
  };
  
  const Content = (props) => {
    return (
      <>
        
        {props.course.parts.map(part => <Part key={part.id} part={part}/>)}
      </>
    );
  };

  const Total = (props) => {
    /*let exercises = 0;
    for (let part of props.course.parts){
      exercises += part.exercises;
    }*/
  
    const exercises = 
    props.course.parts.reduce((s, p) => s + p.exercises, 0)
    console.log(exercises)
  
    return (
      <>
        <p><b>
          total of {" "}
          {exercises}{" "}
          exercises
            </b>
        </p>
      </>
    );
  };
  
  

const Course = ({course}) => {
    return (
    
        <div>
          <Header course={course} />
          <Content
            course={course}
          />
          <Total
            course={course}
          />
        </div>
      );
}

export default Course