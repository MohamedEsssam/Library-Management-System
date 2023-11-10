import dayjs from 'dayjs';

export const formatDate = (date: Date) =>
  dayjs(date).format('YYYY-MMM-dddTHH:mm');

// export const getLastDayForPreviousMonth = () => {
//   const date = new Date(); // current date
//   date.setDate(1); // going to 1st of the month
//   date.setHours(-1); // going to last hour before this date even started.

//   return date;
// };

export const getLastMonth = (date: Date) => {
  date.setMonth(date.getMonth() - 1);

  return date;
};

export const getLastDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
