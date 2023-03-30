import {useState, useEffect} from "react";
import axios from 'axios';

export function useApplicationData() { //is used in Application component
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}, //of all days
    interviewers: {}, //of all days
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((res) => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}));
      //update data for days and appointments in our state at the same time.
    })
  }, []);
  //to check if the state obj has changed: open the "React Components" tab in Dev Tools and select the Application component. Confirm that the state is set after the days and appointments requests are complete
  //This is one approach to solving our data dependency problem. No dependency or empty array needed

  // console.log('state apoint for each day', state.days.forEach(day => day.name === state.day ? console.log(day.appointments) : true));

  //updating remaining spots func
  function updateSpots (appoints){ //updated appointments
    let spots = 0;
    let Dayappoints = [];
    state.days.forEach(day => day.name === state.day ? Dayappoints = day.appointments : true);
    //Dayappoints = [1,2,3,4,5]
    Dayappoints.forEach(id => appoints[id].interview ? true : spots++); //the # of remaining spots = # of appointments with null interview
    return spots;
  };

  //bookInterview func makes an HTTP request and updates the local state.
  function bookInterview(id, interview) { //appointment id and interview obj from onSave func in Form component
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview } //interview key is updated with interview obj from a newly added appointment
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const remainSpots = updateSpots(appointments); //it's the newly updated remaining spots

    return axios.put(`api/appointments/${id}`, {interview}) //this is for the back-end, go to one appointment and update its interview {} with the {interview} that we sent
      .then(() => {
        state.days.forEach(day => day.name === state.day ? day.spots = remainSpots : true);
        setState( prev => ({ //setState = re-render the whole page
          ...prev,
          appointments //it's the newly updated appointments obj
        })) //setState is only for the client side. w/t the back-end update, when we refresh the page, the newly added slot will disappear.
      })
  
    //note: here, the state is changed locally at Application-level
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

    return axios.delete(`/api/appointments/${id}`) //delete the whole appointment in the appointments obj
      .then(() => {
        state.days.forEach(day => day.name === state.day ? day.spots = remainSpots : true);
        setState({ //setState = refresh button, the whole browser will re-render everything again.
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


