import React from "react";

import "components/Application.scss";

import {getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors';
import {useApplicationData} from '../hooks/useApplicationData';

import DayList from './DayList';
import Appointment from 'components/Appointment/index';

//This component will only be responsible for passing data to other components.
//The useApplicationData custom Hook owns the data management.
export default function Application() { 
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyinterviewers = getInterviewersForDay(state, state.day); //[{interviewer},{interviewer},..]
  const dailyAppointments = getAppointmentsForDay(state, state.day); //[{appointment},{appointment},..]
  const EachAppointment = dailyAppointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)} //an object of student and interviewers of an appointment
        interviewers={dailyinterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
            value={state.day} 
            onChange={setDay} //to update day state, which is 'Monday' by default
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

