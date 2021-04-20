import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const updateSpots = (dayName, days, appointments) => {
    const dayObject = days.find((day) => dayName === day.name);
    let newTotalSpots = 0;
    for (let appointment in appointments) {
      if (
        appointments[appointment].interview === null &&
        dayObject.appointments.includes(appointments[appointment].id)
      ) {
        newTotalSpots++;
      }
    }
    return { ...dayObject, spots: newTotalSpots };
  };

  const newDaysArray = (dayObject, daysArray) => {
    return daysArray.map((day) => {
      return dayObject.name === day.name ? dayObject : day;
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
    const days = newDaysArray(
      updateSpots(state.day, state.days, appointments),
      state.days
    );
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((data) => {
        setState((prev) => ({
          ...prev,
          appointments,
          days,
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
    const days = newDaysArray(
      updateSpots(state.day, state.days, appointments),
      state.days
    );
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
          days,
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
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(
      ([{ data: days }, { data: appointments }, { data: interviewers }]) => {
        // const [daysList, appointmentsList, interviewersList] = all;
        // console.log(daysList.data, appointmentsList.data, interviewersList.data);
        setState((prev) => ({
          ...prev,
          days,
          appointments,
          interviewers,
        }));
      }
    );
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
