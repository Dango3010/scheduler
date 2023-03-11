import React from 'react';
import '../Appointment/styles.scss';

import Header from '../Appointment/Header';
import Show from '../Appointment/Show';
import Empty from '../Appointment/Empty';

export default function Appoinment (props) {
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? 
      <Show interviewer={props.interview.interviewer} student={props.interview.student}/> 
      : 
      <Empty />}
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
