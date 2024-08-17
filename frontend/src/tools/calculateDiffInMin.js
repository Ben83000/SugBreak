/**
 * Get the difference in minutes between two dates
 * @param {Date} newDate 
 * @param {Date} oldDate 
 * @returns number (minutes between the new and the old date)
 */
const calculateDiffInMin = (newDate, oldDate) => {
  const diffInMilliseconds = newDate - oldDate;
  const diffInSeconds = diffInMilliseconds / 1000; // on divise par 1000 car 1000 milliseconde = 1 seconde
  const diffInMinutes = diffInSeconds / 60; // divise par 60 car 60 sec = 1 min
  return diffInMinutes;
}

export default calculateDiffInMin;