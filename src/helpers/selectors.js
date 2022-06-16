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