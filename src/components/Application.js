import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors.js";
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
  }
  

  useEffect(() => {
    //let url = "http://localhost:8001/api/days"
    Promise.all([
      axios.get(urls.GET_DAYS),
      axios.get(urls.GET_APPOINTMENTS),
      axios.get(urls.GET_INTERVIEWERS)
    ]).then((all) => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    /* let url = "http://localhost:8001/api/days";
    //console.log("Url: ", url);
    axios.get(url)
      .then(response => {
        //console.log(response);
        //setDays(response.data);
        //setDays([]);
      })
      .catch(err => {
        console.log(err);
      }) */
  },[]);
  
  /* const dailyAppointments = getAppointmentsForDay(state, state.day);

  const apms = dailyAppointments.map((appointment) => {
    return <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={appointment.interview}
            />
  }); */

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
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
