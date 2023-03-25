import React, {useState} from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const handleChange = function(event) {
    setStudent(event.target.value); //update student value
  }
  const reset = function() {
    setStudent("");
    setInterviewer(null);
  };
  const cancel = function() {
    props.onCancel();
    reset();
  };

  function validate() {
    if (!student) {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student} //student value is updated, so is value in input element, causing re-render with the new value
            onChange={handleChange} //called when the user enters student name
            data-testid="student-name-input"
          />
        <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={props.interviewers} //pass in the array of interviewers
          value={interviewer} //selected interviewer
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={() => validate()} >Save</Button>
        </section>
      </section>
    </main>
  );
}

/*
Form Editing props:
  student='Dango'
  interviewer={1}
  interviewers={interviewers}
  onSave={action('onSave')}
  onCancel={action('onCancel')}
Form Creating props:
  interviewers={interviewers}
  onSave={action('onSave')}
  onCancel={action('onCancel')}
*/

/*
purpose: In this component, a user inputs their information, saves it, and edits it.

features of the <Form>:
1. it will track the state of the 2 elements (the student's name (the text input field) as a string and the selected interviewer's ID as a number)
it will use an <input /> element to accept the name of the student
and the <InterviewerListItem /> component to display the selected interviewer.
2. when we create the appointment, the student will default to "". The interviewer state will default to null.
  if there is an interview booked, then the name of the student and the ID of the interviewer should be used to initialize these values.

the <Form> keeps track of the current text input value and the currently selected interviewer.
  this way, when the user clicks on the save button, it will be able to pass the state as arguments to an onSave callback.

we will need to make the <input> field a controlled component using the student state to keep track of the value. 
  Remember that the <InterviewerList> component takes a callback we named onChange.
    We can use this to keep track of the currently selected interviewer within the <Form> component. 
    when we click on the Save button, it should pass the student and the interviewer as arguments to onSave.

The <Form> component should track the following state:
  student:String
  interviewer:Number
The <Form> component should have the following actions:
  setStudent:Function
  setInterviewer:Function
The <Form> component should take the following props:
  student:String
  interviewers:Array
  interviewer:Number
  onSave:Function
  onCancel:Function
*/

/* TESTING
use the React Development Tools to check that the state is being updated appropriately and the functions that we assigned are working.
1. open the Chrome Development tools and choose the "React Components" panel.
  Storybook is also itself built with React, and it is inside the Root component. 
2. collapse the Root component that Storybook uses so we can easily see our <Form> component.
3. when we type in a student's name and select an interviewer we can watch the values get updated in the inspector panel. 
  we have two useState hooks, one starts as an empty string and the other one is the null interviewer value. We can track their changes in real time.
*/