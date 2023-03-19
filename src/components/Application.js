import React, {useState, Fragment, useEffect} from "react";
import axios from 'axios';

import "components/Application.scss";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors';

import DayList from './DayList';
import Appointment from 'components/Appointment/index';

export default function Application() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((res) => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
      //update data for days and appointments in our state at the same time.
    })
  });
  //to check if the state obj has changed: open the "React Components" tab in Dev Tools and select the Application component. Confirm that the state is set after the days and appointments requests are complete
  //This is one approach to solving our data dependency problem. No dependency or empty array needed

  function bookInterview(id, interview) { //appointment id and interview from onSave func in Form component
    console.log('from bookInterview:', id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview } //interview key is updated with interview obj from a newly added appointment
    };
    console.log('updated appointment', appointment);
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log('updated appointments:', appointments[4]);

    setState(prev => ({
      ...prev,
      appointments
    }));
    console.log('state:', state.appointments[4]);
    return;
    //the state is changed locally at Application-level
  };

  const dailyAppointments = getAppointmentsForDay(state, state.day); //[appointment.4,appointment.5]
  const dailyinterviewers = getInterviewersForDay(state, state.day); //[interviewers.2]
  
  const EachAppointment = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview); //an object of student and interviewers of an appointment

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={dailyinterviewers}
        bookInterview={bookInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day} //for re-render on browser
            onChange={setDay} //to update 'day', which is 'Monday' by default
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <>
          {EachAppointment}
          <Appointment key="last" time="5pm" />
        </>
      </section>
    </main>
  );
}
/* note on useState:
When we call the setDay action, it changes the day state. 
  When we change the state, the <Application> renders and passes the new day to the <DayList>. 
  The <DayList> renders and passes props to the <DayListItem> children causing the updates to the selected visual state.
  (clicking-and-choosing-a-day-on-the-day-list feature on the left handout of the app)
*/