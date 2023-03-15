import React, {useState, Fragment, useEffect} from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from './DayList';
import Appointment from 'components/Appointment/index';

//mock data to test features:
/*const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};
*/

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  const dailyAppointments = [];

  const EachAppointment = dailyAppointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
      />
    );
  });

  useEffect(() => {
    axios.get('/api/days').then((response) => {
      setDays(response.data); //response should be an array of days
    });
  }, []);

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
            // day = 'Monday' by default
            onChange={setDay}
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