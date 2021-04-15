export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
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

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  for (const key in state.interviewers) {
    if (state.interviewers[key].id === interview.interviewer) {
      return { ...interview, interviewer: state.interviewers[key] };
    }
  }
}

//function getAppointmentForDay2()

///////
/// Alternate Solution:
///////////////////

// export default function getAppointmentsForDay(state, day) {
//  //... returns an array of appointments for that day
//   for (const eachDay of state.days) {
//     if (eachDay.name === day) {
//       return item.appointments.map((id) => state.appointments[id]);
//     }
//   }
//   return [];
// }
