import {useState, useEffect} from "react";
import axios from 'axios';

//useApplicationData() is used in Application component
export function useApplicationData() { 
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}, 
    interviewers: {}, 
  });
  const setDay = day => setState({ ...state, day });

  const dayURL = "http://localhost:8001/api/days";
  const appointmentURL = "http://localhost:8001/api/appointments";
  const interviewerURL = "http://localhost:8001/api/interviewers";

  //to check if the state obj has changed: open the "React Components" tab in Dev Tools and select the Application component. Confirm that the state is set after the days and appointments requests are complete.
  useEffect(() => {
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewerURL)
    ]).then((res) => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data})); //update data for days and appointments in our state at the same time.
    })
  }, []); 

  //updating remaining spots func; appoints = updated appointments
  function updateSpots (appoints){ 
    let spots = 0;
    let Dayappoints = [];
    state.days.forEach(day => day.name === state.day ? Dayappoints = day.appointments : true); //Dayappoints = [1,2,3,4,5]
    Dayappoints.forEach(id => appoints[id].interview ? true : spots++); //the # of remaining spots = # of appointments with null interview
    return spots;
  };

  //bookInterview func makes an HTTP request and updates the local state.
  function bookInterview(id, interview) { //appointment id and interview obj from onSave func in Form component
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview } 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const remainSpots = updateSpots(appointments); //it's the newly updated remaining spots

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview}) 
      .then(() => {
        state.days.forEach(day => day.name === state.day ? day.spots = remainSpots : true);
        setState( prev => ({ 
          ...prev,
          appointments 
        })) 
      })
  };

  //cancelInterview func makes an HTTP request and updates the local state.
  function cancelInterview(id) { 
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const remainSpots = updateSpots(appointments); //it's the newly updated remaining spots

    //delete the whole appointment in the appointments obj
    return axios.delete(`http://localhost:8001/api/appointments/${id}`) 
      .then(() => {
        state.days.forEach(day => day.name === state.day ? day.spots = remainSpots : true);
        setState({ 
          ...state, 
          appointments
        })
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}


