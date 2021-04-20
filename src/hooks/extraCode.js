// Deprecated method to update the spots remaning in the state

// const updateSpots = (dayName, newSpotsRemaining) => {
//   setState((prev) => ({
//     ...prev,
//     days: prev.days.map((day) =>
//       day.name === dayName ? { ...day, spots: newSpotsRemaining } : day
//     ),
//   }));
// };
// // const updateSpots = (dayName, newSpotsRemaining) => {
// //   return state.days.map((day) => {
// //     return day.name === dayName ? { ...day, spots: newSpotsRemaining } : day;
// //   });
// // };

// // loops over the days array, we map() by appointment ID the interview object in interviews obj
// // We filter the new mapped array of obj where interview === null, and take the lenght of the null values for each day
// // then if the newSpotsRemaining does not equal to day.spots, we call updateSpots
// // ULTIMATELY: We return a new state.days array to update the state, with the call of updateSpots
// // the reason there would be a delta between the spots and interviews is that we update the interviews in the create/delete functions
// const spotsRemaining = () => {
//   state.days.forEach((day) => {
//     const newSpotsRemaining = day.appointments
//       .map((apptId) => state.appointments[apptId].interview)
//       .filter((item) => item === null).length;
//     if (newSpotsRemaining !== day.spots) {
//       return updateSpots(day.name, newSpotsRemaining);
//     }
//   });
// };

// useEffect(() => {
//   // This works, but the I probably should not be using useffect here, as it's reseting the state too many times, and there's no second parameter.
//   spotsRemaining();
// });

// ----------------

// const updateSpots = (dayName, newSpotsRemaining, stateObj) => {
//   return stateObj.days.map((day) => {
//     return day.name === dayName ? { ...day, spots: newSpotsRemaining } : day;
//   });
// };

// // loops over the days array, we map() by appointment ID the interview object in interviews obj
// // We filter the new mapped array of obj where interview === null, and take the lenght of the null values for each day
// // then if the newSpotsRemaining does not equal to day.spots, we call updateSpots
// // ULTIMATELY: We return a new state.days array to update the state, with the call of updateSpots
// // the reason there would be a delta between the spots and interviews is that we update the interviews in the create/delete functions
// const spotsRemaining = (prev) => {
//   const stateObj = { ...prev };
//   stateObj.days.forEach((day) => {
//     const newSpotsRemaining = day.appointments
//       .map((apptId) => stateObj.appointments[apptId].interview)
//       .filter((item) => item === null).length;
//     console.log("SPOTS REMANING", newSpotsRemaining);
//     console.log("DAY.SPOTS", day.spots);
//     if (newSpotsRemaining !== day.spots) {
//       console.log("The if gets called");
//       return updateSpots(day.name, newSpotsRemaining, stateObj);
//     }
//   });
// };