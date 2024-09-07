import dayjs from "dayjs";

export const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  // 計算上個月的最後幾天
  const firstDayOfCurrentMonth = new Date(year, month, 1).getDay(); // 取得當月的第一天是星期幾
  const changeFirstDayToMonday =
    firstDayOfCurrentMonth === 0 ? 6 : firstDayOfCurrentMonth - 1; // 將星期日(0)調整為6

  const previousMonthDays = Array.from(
    { length: changeFirstDayToMonday },
    (_, i) => ({
      year: year,
      month: month,
      date: daysInPreviousMonth - changeFirstDayToMonday + i + 1,
    })
  );

  // 當前月份的日期
  const currentMonthDays = Array.from(
    { length: daysInCurrentMonth },
    (_, i) => ({
      year: year,
      month: month + 1,
      date: i + 1,
    })
  );

  return [...previousMonthDays, ...currentMonthDays];
};

export const formatDate = (date, format) => {
  return dayjs(date).format(format);
};

export const DATE_FORMAT = {
  DAYJS: "YYYY-MM-DDTHH:mm:ss.SSS",
  DAYJS_SLASH_AM_PM: "YYYY/MM/DD HH:mm:ssA",
  DAYJS_SLASH: "YYYY/MM/DD",
  DAYJS_DASH: "YYYY-MM-DD",
  DAYJS_CN: "YYYY年MM月DD日",
  DAYJS_YEAR_MONTH_CN: "YYYY年MM月",
  DAYJS_TIME_SLASH: "YYYY/MM/DD HH:mm",
  DATE: "yyyy-MM-ddTHH:mm:ss.SSS",
  DATE_SLASH: "yyyy/MM/dd",
  DATE_DASH: "yyyy-MM-dd",
  DATE_CN: "yyyy年MM月dd日",
  TIME: "HH:mm",
};
