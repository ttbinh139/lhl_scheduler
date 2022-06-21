import { useState, useEffect }  from "react";
import axios from "axios";

export default function useApplicationData() {

  //const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });  

  const setDay = day => {
    //console.log("Before set state", state);
    setState({ ...state, day })
    //console.log("After set state", state);
  };

  const urls = {
    "GET_DAYS":     "http://localhost:8001/api/days",
    "GET_APPOINTMENTS": "http://localhost:8001/api/appointments",
    "GET_INTERVIEWERS": "http://localhost:8001/api/interviewers",
    "PUT_APPOINTMENT_API": "http://localhost:8001/api/appointments/",
  }
  
  const bookInterview = function(id, interview) {
    console.log("On save - book interview");
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
     
    return axios.put(urls.PUT_APPOINTMENT_API + id, {interview})
      .then(res => {
        console.log("Request successful");
        setState(
          {
          ...state,
          appointments
        })  
        });
  };

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(urls.PUT_APPOINTMENT_API + id)
      .then(res => {
        console.log("Put successfull");
        //setState({...state, appointments})
      });
  };

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

  return { state, setDay, bookInterview, cancelInterview };
};