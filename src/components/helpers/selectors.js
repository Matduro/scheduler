export function getAppointmentsForDay(state, day) {
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
