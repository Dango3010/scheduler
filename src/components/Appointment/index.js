import React, {useEffect} from 'react';
import {useVisualMode} from '../../hooks/useVisualMode';
import '../Appointment/styles.scss';

import Header from '../Appointment/Header';
import Show from '../Appointment/Show';
import Empty from '../Appointment/Empty';
import Form from '../Appointment/Form';

const EMPTY = 'EMTPY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appoinment (props) { //deal with one appointment at a time
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) { //added student name and interviewer ID
    const interview = {
      student: name,
      interviewer
    };
    
    return props.bookInterview(props.id, interview);
  };

  useEffect(() => { //is only run when the dependecy has changed
    if(props.interview && mode !== SHOW) { //mode !== SHOW is here so the useEffect won't run again with the appointments that are already shown
      transition(SHOW);
    }
  }, [props.interview]); //only apply for appointments with null interviews, main purpose: to run transition(SHOW) after the props.bookInterview() is called

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && (
      <Show 
        interviewer={props.interview.interviewer} 
        student={props.interview.student}
      /> 
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form 
        interviewers={props.interviewers} 
        onCancel={() => back(EMPTY)}
        onSave={save}
      />}
    </article>
  );
}

/* props:
<Fragment>
  <Appointment id={1} time="4pm" />
  <Appointment time="5pm" />
</Fragment>

props to test <show> when there's a booked appointment:
<Fragment>
  <Appointment
    id={1}
    time="4pm"
    interview={{ student: "Lydia Miller-Jones", interviewer }} //interviewer = interviewer obj
  />
  <Appointment time="5pm" />
</Fragment>
  note that: <Show> component takes in two props: a student (string) and an interviewer (object).

in styles.scss file, we have:
.appointment:last-of-type .appointment__add {
  display: none;
}
Set display to none for any elements that:
  have a class of appointment__add AND
  have an ancestor with a class of appointment AND
  that ancestor is the last element with a class of appointment inside its parent container (i.e. last of that type).

*/
