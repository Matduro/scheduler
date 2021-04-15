// return number of spots for a particular day
//2

const nbSpots = (day) => {
  const dayFound = state.days.find((eachDay) => eachDay.name === day);

  const emptyAppointments = dayFound.appointments.filter(
    (appointmentsId) => state.appointments[appointmentsId] === null
  );
  console.log(emptyAppointments);

  return emptyAppointments.length;
};
nbSpots(state.day);
