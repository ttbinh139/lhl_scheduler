import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
  //const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });  

  const setDay = day => setState({ ...state, day });

  /* const setDays = (days) => {
    setState(prev => ({...prev, days}));
  } */

  //const dailyAppointments = [];

  const urls = {
    "GET_DAYS":     "http://localhost:8001/api/days",
    "GET_APPOINTMENTS": "http://localhost:8001/api/appointments",
    "GET_INTERVIEWERS": "http://localhost:8001/api/interviewers",
    "PUT_APPOINTMENT_API": "http://localhost:8001/api/appointments/",
  }
  

  useEffect(() => {
    //let url = "http://localhost:8001/api/days"
    Promise.all([
      axios.get(urls.GET_DAYS),
      axios.get(urls.GET_APPOINTMENTS),
      axios.get(urls.GET_INTERVIEWERS)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  },[]);
  
  const bookInterview = function(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(urls.PUT_APPOINTMENT_API + id, {interview:interview})
      .then(all => {
        console.log("Book Interview: ",all.data);
        setState({...state, appointments});
      })
  };

  const cancelInterview = function(id) {
    console.log("Cancel interview - application");
    console.log(id);
    return axios.delete(urls.PUT_APPOINTMENT_API + id);
  };

  const appointments = getAppointmentsForDay(state, state.day);
  //console.log("Get appointments for day: ",appointments);
  const interviewers = getInterviewersForDay(state, state.day);
  //console.log("Get intervier for day")
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    //console.log("Get interviews: ",interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
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
