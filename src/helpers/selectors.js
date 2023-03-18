//selectors are mainly used to transfom data for components
//will write unit tests to test these selectors as well
export function getAppointmentsForDay(state, day) {
  let appoiArray = [];
  let appointments = [];
  state.days.forEach(element => element.name === day ? appoiArray = element.appointments : []);
    //appoiArray = the appointments array of that day = [1,2,3]
  appoiArray.forEach(id => state.appointments[id] ? appointments.push(state.appointments[id]) : true);
  return appointments; //an array of appointments objs for the day
};

export function getInterview(state, interview) {
  let interviews = {};
  if(interview) {
    interviews.student = interview.student; 
    interviews.interviewer = state.interviewers[interview.interviewer]
  } else {
    interviews = null;
  }
  return interviews; //an object of student and interviewers of an appointment
};

export function getInterviewersForDay(state, day) {
  let appoiArray = [];
  let InterIdArra = [];
  let interviewers = [];
  state.days.forEach(element => element.name === day ? appoiArray = element.appointments : []);
    //appoiArray = the appointments array of that day = [4,5]
  
  appoiArray.forEach(id => {
    const interview = state.appointments[id].interview;
    if (interview && InterIdArra.indexOf(interview.interviewer) === -1) {
      InterIdArra.push(state.appointments[id].interview.interviewer)
    } else {
      InterIdArra.push(null);
    }
  });
    //InterIdArra = [null, 2]
  InterIdArra.forEach(id => state.interviewers[id] ? interviewers.push(state.interviewers[id]) : true);
    /*interviewers = [
          {
            id: 2,
            name: 'Tori Malcolm',
            avatar: 'https://i.imgur.com/Nmx0Qxo.png'
          }
        ]
    */
  return interviewers; //an array of interviewers objs for the day
};