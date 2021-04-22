//... returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find((eachDay) => eachDay.name === day);
  const newAppoinments = [];
  const filterAppointments = () => {
    for (const appoinment of filteredDay.appointments) {
      newAppoinments.push(state.appointments[appoinment]);
    }
  };
  filteredDay && filterAppointments();
  return newAppoinments;
}

//update state with interviewer
export function getInterview(state, interview) {
  return (
    interview && {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    }
  );
}

// Returns an array of interviews for a given day
export function getInterviewersForDay(state, day) {
  const dayFound = state.days.find((eachDay) => eachDay.name === day);
  if (!dayFound) {
    return [];
  }

  const interviews = dayFound.interviewers.map(
    (interviewerId) => state.interviewers[interviewerId]
  );

  return interviews;
}
