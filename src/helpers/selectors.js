export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDays = state.days.filter(dayItem => dayItem.name === day);
  //console.log(filteredDays);
  if (filteredDays.length === 0) {
    return [];
  }

  const appointmentList = filteredDays[0].appointments;

  //console.log(appointmentList);

  const result = [];

  for (const idx of appointmentList) {
    if (state.appointments[idx]) {
      result.push(state.appointments[idx]);
    }
  }

  return result;
};

export function getInterview(state, interview) {
  /* console.log(state);
  console.log(interview); */
  let interviewer = null;

  if (interview === null) {
    return null;
  }
  
  for (const idx in state.interviewers) {
    if (parseInt(idx) === interview.interviewer) {
      interviewer = state.interviewers[idx];
    }
  }
  //console.log(interviewer);
  /* interview.interviewer = interviewer;
  return interview; */
  return {
    ...interview,
    interviewer: interviewer
  }
}