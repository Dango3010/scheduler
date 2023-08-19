import React from 'react';
import {useVisualMode} from '../../hooks/useVisualMode';
import '../Appointment/styles.scss';

import Header from '../Appointment/Header';
import Show from '../Appointment/Show';
import Empty from '../Appointment/Empty';
import Form from '../Appointment/Form';
import Status from '../Appointment/Status';
import Confirm from '../Appointment/Confirm';
import Error from '../Appointment/Error';

const EMPTY = 'EMTPY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_DELETE = 'ERROR_DELETE';
const ERROR_SAVE = 'ERROR_SAVE';

export default function Appoinment (props) { 
  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) { 
    const interview = {
      student: name,
      interviewer
    };
    
    transition('SAVING');
    props.bookInterview(props.id, interview)
      .then(() => transition('SHOW')) 
      .catch(error => {
        console.log('error from bookInterview func:', error);
        transition(ERROR_SAVE, true);
      });
  };
  
  function deleteFunc () {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => {
        console.log('err from cancelInterview:', err);
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {(mode === SHOW && props.interview) && (
      <Show 
        interviewer={props.interview.interviewer} 
        student={props.interview.student}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      /> 
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form 
        interviewers={props.interviewers} 
        onCancel={() => back()}
        onSave={save}
      />}
      {mode === EDIT && <Form 
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers} 
        onCancel={() => back()}
        onSave={save}
      />}
      {mode === CONFIRM && <
        Confirm message={'You are sure you wanna delete this? It is a bad idea'}
        onCancel={() => transition(SHOW)}
        onConfirm={deleteFunc}
      />}
      {mode === SAVING && <Status message={'Saving'}/>}
      {mode === DELETING && <Status message={'Deleting'}/>}
      {(mode === ERROR_DELETE || mode === ERROR_SAVE) && 
        <Error 
        message={'Oh! there is an error, probably caused by you!'}
        onClose={() => back()}
        />}
    </article>
  );
}

