import React, {useState, Fragment, useEffect} from "react";
import axios from 'axios';

export function useVisualMode(initial) { //our custom hooks, is used in Appointment component to control mode state
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); //store the mode state history as an array so we can transition back

  const transition = function(currentMode, replace){
    if(replace){
      history.pop();
    }
    history.push(currentMode);
    return setMode(currentMode);
  }
  const back = function(){
    if (history.length > 1) { //ensure that when mode is at the initial value, it can't transition back further
      history.pop();
      return setMode(history[history.length - 1]);
    }
    return setMode(initial);
  }
  return {mode, transition, back};
};
// This lets our tests (and components) access the current value of the mode from the hook.

export function useApplicationData() { //is used in Application component
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((res) => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
      //update data for days and appointments in our state at the same time.
    })
  }, []);
  //to check if the state obj has changed: open the "React Components" tab in Dev Tools and select the Application component. Confirm that the state is set after the days and appointments requests are complete
  //This is one approach to solving our data dependency problem. No dependency or empty array needed

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

    return axios.put(`api/appointments/${id}`, {interview}) //this is for the back-end, go to one appointment and update its interview {} with the {interview} that we sent
      .then(() => {
        setState( prev => ({
          ...prev,
          appointments //it's the newly updated appointments obj
        })); //setState is only for the client side. w/t the back-end update, when we refresh the page, the newly added slot will disappear.
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

    return axios.delete(`http://localhost:8001/api/appointments/${id}`) //delete the whole appointment in the appointments obj
      .then(() => {
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


