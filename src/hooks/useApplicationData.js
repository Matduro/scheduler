import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Counts the number of spots for a given day, and updates the associated day object
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

  // Creates a new days array, and is meant to be used with updateSpots()
  const newDaysArray = (dayObject, daysArray) => {
    return daysArray.map((day) => {
      return dayObject.name === day.name ? dayObject : day;
    });
  };

  // Books a new interview. Update the State and the Database
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
        }));
      })
      .catch((err) => {
        throw err;
      });
  }

  // Cancels an existing interview interview. Update the State and the Database
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
        }));
      })
      .catch((err) => {
        throw err;
      });
  }

  // update the day state
  const setDay = (day) => setState({ ...state, day });

  // Initial data request from the database
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(
      ([{ data: days }, { data: appointments }, { data: interviewers }]) => {
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
