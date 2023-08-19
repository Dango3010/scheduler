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
            value={student} 
            onChange={handleChange} 
            data-testid="student-name-input"
          />
        <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
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

