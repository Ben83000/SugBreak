/**
 * Format a date to get hours and minutes from it
 * @param {Date} date The date to format
 * @param {number} extraTime The extra time to add (in minutes) if necessary
 * @returns Date
 */
const formatDateToTime = (date, extraTime) => {
  const orderDate = new Date(date);
  extraTime && orderDate.setMinutes(orderDate.getMinutes() + extraTime);
  // Permet de recuperer la bonne heure meme si le pc/tel du client a une heure erronée
  const orderHour = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Paris',
  })
    .format(orderDate)
    .replace(':', 'h');
  return orderHour
};

export default formatDateToTime;
