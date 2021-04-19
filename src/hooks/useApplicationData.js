import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const updateSpots = (dayName, newSpotsRemaining) => {
    setState((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.name === dayName ? { ...day, spots: newSpotsRemaining } : day
      ),
    }));
  };
  // const updateSpots = (dayName, newSpotsRemaining) => {
  //   return state.days.map((day) => {
  //     return day.name === dayName ? { ...day, spots: newSpotsRemaining } : day;
  //   });
  // };

  // loops over the days array, we map() by appointment ID the interview object in interviews obj
  // We filter the new mapped array of obj where interview === null, and take the lenght of the null values for each day
  // then if the newSpotsRemaining does not equal to day.spots, we call updateSpots
  // ULTIMATELY: We return a new state.days array to update the state, with the call of updateSpots
  // the reason there would be a delta between the spots and interviews is that we update the interviews in the create/delete functions
  const spotsRemaining = () => {
    state.days.forEach((day) => {
      const newSpotsRemaining = day.appointments
        .map((apptId) => state.appointments[apptId].interview)
        .filter((item) => item === null).length;
      if (newSpotsRemaining !== day.spots) {
        return updateSpots(day.name, newSpotsRemaining);
      }
    });
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((data) => {
        setState((prev) => ({
          ...prev,
          appointments,
          // days: prev.days.map((day) => ({ ...day, spots: day.spots - 1 })), // This only works on delete, not on edit
        }));
      })
      .catch((err) => {
        throw err;
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
          //days: prev.days.map((day) => ({ ...day, spots: day.spots + 1 })), // This only works on delete, not on edit
        }));
      })
      .catch((err) => {
        throw err;
      });
  }

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    // This works, but the I probably should not be using useffect here, as it's reseting the state too many times, and there's no second parameter.
    spotsRemaining();
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [daysList, appointmentsList, interviewersList] = all;
      // console.log(daysList.data, appointmentsList.data, interviewersList.data);
      setState((prev) => ({
        ...prev,
        days: daysList.data,
        appointments: appointmentsList.data,
        interviewers: interviewersList.data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
