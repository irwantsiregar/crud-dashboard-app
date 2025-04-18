import { DateValue } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";

const standarTime = (time: number) => (Number(time) < 10 ? `0${time}` : time);

const toDateStandar = (date: DateValue) => {
  const year = date.year;
  const month = standarTime(date.month);
  const day = date.day;

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${year}-${month}-${day} ${standarTime(hour)}:${standarTime(minute)}:${standarTime(second)}`;

  return result;
};

const toInputDate = (date: string) => {
  const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);

  return formattedDate;
};

export { toDateStandar, toInputDate };
