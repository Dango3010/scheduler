export function getAppointmentsForDay(state, day) {
  let appoiArray = [];
  let appointments = [];
  state.days.forEach(element => element.name === day ? appoiArray = element.appointments : []);
    //appoiArray = the appointments array of that day = [1,2,3]
  appoiArray.forEach(id => state.appointments[id] ? appointments.push(state.appointments[id]) : true);
  return appointments; //an array of appointments objs for the day
};

