import React, {useEffect} from 'react';
import {useVisualMode} from '../../hooks/useVisualMode';
import '../Appointment/styles.scss';

import Header from '../Appointment/Header';
import Show from '../Appointment/Show';
import Empty from '../Appointment/Empty';
import Form from '../Appointment/Form';
import Status from '../Appointment/Status';
import Confirm from '../Appointment/Confirm';

const EMPTY = 'EMTPY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';

export default function Appoinment (props) { //deal with one appointment at a time
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) { //added student name and interviewer ID
    const interview = {
      student: name,
      interviewer
    };
    
    transition('SAVING');
    props.bookInterview(props.id, interview)
      .then(() => transition('SHOW')); //end the axios PUT request here (no semicolon in 'return' of bookInterview() func in Application.js)
  };

  //another way to run transition(SHOW) after the props.bookInterview() is called:
  // useEffect(() => { //is only run when the dependecy has changed
  //   if(props.interview && mode !== SHOW) { //mode !== SHOW is here so the useEffect won't run again with the appointments that are already shown
  //     transition(SHOW);
  //   }
  // }, [props.interview]); //only apply for appointments with null interviews, main purpose: to run transition(SHOW) after the props.bookInterview() is called

  function deleteFunc () {
    transition(DELETE);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  };

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {(mode === SHOW && props.interview) && (
      <Show 
        interviewer={props.interview?.interviewer} //if props.interview is true, render props.interview.interviewer!
        student={props.interview?.student}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      /> 
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form 
        interviewers={props.interviewers} 
        onCancel={() => back(EMPTY)}
        onSave={save}
      />}
      {mode === EDIT && <Form 
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers} 
        onCancel={() => back(SHOW)}
        onSave={save}
      />}
      {mode === CONFIRM && <
        Confirm message={'You are sure you wanna delete this? It is a bad idea'}
        onCancel={() => transition(SHOW)}
        onConfirm={deleteFunc}
      />}
      {mode === SAVING && <Status message={'Saving'}/>}
      {mode === DELETE && <Status message={'Deleting'}/>}
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
