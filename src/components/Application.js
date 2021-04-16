import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

import "components/Application.scss";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 3,
//     time: "3pm",
//     interview: {
//       student: "Mathieu Durand Rousseau",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 4,
//     time: "4:00pm",
//     interview: {
//       student: "Grogu",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 5,
//     time: "4:30pm",
//   },
// ];

export default function Application(props) {
  // const [day, setDay] = useState([]);
  // let [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

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

  // Renders data for days (navbar)
  // useEffect(() => {
  //   const daysAPI = "http://localhost:8001/api/days";
  //   axios.get(daysAPI).then((response) => {
  //     console.log("response", response);
  //     setDays([...response.data]);
  //   });
  // }, []);

  // const dailyAppointments = getAppointmentsForDay(state, state.day);

  // const appointmentList = dailyAppointments.map((appointment) => {
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       {...appointment} // spread to copy all key/value pairs
  //     />
  //   );
  // });

  const appointments = getAppointmentsForDay(state, state.day);
  //console.log("Appointments for day", appointments);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        {...appointment}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* <DayList days={days} day={day} setDay={setDay} /> */}
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
