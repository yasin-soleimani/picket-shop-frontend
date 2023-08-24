import moment from "jalali-moment";

// date + time
export const convertFullDate = (date: Date | string): string => {
  const DATE = new Date(date);

  return moment(DATE, "HH:mm - YYYY-M-D")
    .locale("fa")
    .format("HH:mm - YYYY/M/D");
};

// just date
export const convertDate = (date: Date | string): string => {
  const DATE = new Date(date);

  return moment(DATE, "YYYY-M-D").locale("fa").format("YYYY/M/D");
};
