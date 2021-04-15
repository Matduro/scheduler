export default function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.find((item) => item.name === day);
  const newAppoinments = [];
  const filterAppointments = () => {
    for (const appoinment of filteredDay.appointments) {
      newAppoinments.push(state.appointments[appoinment]);
    }
  };
  filteredDay && filterAppointments();
  return newAppoinments;
}

///////
/// Alternate Solution:
///////////////////

// export default function getAppointmentsForDay(state, day) {
//  //... returns an array of appointments for that day
//   for (const item of state.days) {
//     if (item.name === day) {
//       return item.appointments.map((id) => state.appointments[id]);
//     }
//   }
//   return [];
// }
