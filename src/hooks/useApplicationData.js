import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const updateSpots = (dayName, days) => {
    console.log("HELLO THERE!");
    setState((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.name === dayName ? { ...day, spots: days } : day
      ),
    }));
  };

  const spotsRemaining = () => {
    state.days.forEach((day) => {
      const newSpotsRemaining = day.appointments
        .map((apptId) => state.appointments[apptId].interview)
        .filter((item) => item === null).length;
      if (newSpotsRemaining !== day.spots) {
        updateSpots(day.name, newSpotsRemaining);
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
        console.log("DATA", data);
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
