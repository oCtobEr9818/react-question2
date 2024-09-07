import React, { useState } from "react";
import { getDaysInMonth, formatDate, DATE_FORMAT } from "../../utils/dateUtils";

const initialDate = new Date();

const Calendar = ({ title, isCrossMonth = false }) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const daysInMonth = getDaysInMonth(currentDate);
  const currentMonth = currentDate.getMonth();
  const today = initialDate;

  const disabledSwitchMonth = startDate !== null && !isCrossMonth;

  const handleDateClick = (obj) => {
    if (isCrossMonth) {
      if (startDate === null) {
        setStartDate(obj);
      } else if (endDate === null) {
        if (
          obj.month > startDate.month ||
          (obj.month === startDate.month && obj.date > startDate.date)
        ) {
          setEndDate(obj);
        } else {
          setStartDate(obj);
          setEndDate(null);
        }
      } else {
        setStartDate(obj);
        setEndDate(null);
      }
    } else {
      if (startDate === null) {
        setStartDate(obj);
      } else if (endDate === null && obj.date >= startDate.date) {
        setEndDate(obj);
      } else {
        setStartDate(obj);
        setEndDate(null);
      }
    }
  };

  const renderCalender = () => {
    return daysInMonth.map((obj, index) => {
      const isPreviousMonth = obj.month < currentMonth + 1; // 判斷是否為上個月
      const isNextMonth = obj.month > currentMonth + 1; // 判斷是否為下個月
      const isDisabled = (isPreviousMonth || isNextMonth) && !isCrossMonth; // 判斷是否為非當月份
      const isToday =
        obj.date === today.getDate() &&
        obj.month === today.getMonth() + 1 &&
        obj.year === today.getFullYear();

      // 設置樣式
      let dayClass = "bg-white";
      if (isDisabled) {
        dayClass = "text-[#757575] cursor-not-allowed";
      } else if (isToday) {
        dayClass = "bg-[#ffff76]";
      } else if (hoveredDay === `${obj.month}/${obj.date}`) {
        dayClass = "bg-[#e6e6e6]";
      }

      // 選擇的開始日期先設置顏色
      if (
        startDate &&
        obj.date === startDate.date &&
        obj.month === startDate.month
      ) {
        dayClass = "bg-[#006edc] text-white";
      }

      // 選擇的日期範圍，設置顏色
      if (startDate && endDate) {
        let isInRange;
        if (isCrossMonth) {
          // Task 2 的邏輯
          isInRange =
            (obj.month === startDate.month && obj.date >= startDate.date) ||
            (obj.month === endDate.month && obj.date <= endDate.date) ||
            (obj.month > startDate.month && obj.month < endDate.month);

          if (startDate.month === endDate.month) {
            isInRange =
              obj.month === startDate.month &&
              obj.date >= startDate.date &&
              obj.date <= endDate.date;
          }
        } else {
          // Task 1 的邏輯
          isInRange =
            obj.date >= startDate.date &&
            obj.date <= endDate.date &&
            obj.month === startDate.month;
        }
        if (isInRange) {
          dayClass = "bg-[#006edc] text-white";
        }
      }

      return (
        <div
          key={index}
          className={`text-center w-[50px] h-9 leading-9 ${dayClass}`}
          onMouseEnter={() => setHoveredDay(`${obj.month}/${obj.date}`)}
          onMouseLeave={() => setHoveredDay(null)}
          onClick={!isDisabled ? () => handleDateClick(obj) : undefined} // Task1 非當月份的日期不允許點擊
        >
          {obj.date}日
        </div>
      );
    });
  };

  const handleClearDate = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div>
        <h1 className="text-2xl">{title}</h1>
      </div>
      <div className="flex flex-col items-end w-[350px] h-[240px] text-base">
        <div className="flex justify-between items-center w-full h-11 mb-4">
          <button
            className={`w-11 h-full hover:bg-[#e6e6e6] ${
              disabledSwitchMonth && "cursor-not-allowed"
            }`}
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
              )
            }
            disabled={disabledSwitchMonth} // 當選擇開始日期後就不能切換月份
          >
            ‹
          </button>
          <span>
            {formatDate(currentDate, DATE_FORMAT.DAYJS_YEAR_MONTH_CN)}
          </span>
          <button
            className={`w-11 h-11 hover:bg-[#e6e6e6] ${
              disabledSwitchMonth && "cursor-not-allowed"
            }`}
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
              )
            }
            disabled={disabledSwitchMonth}
          >
            ›
          </button>
        </div>
        <div className="grid grid-cols-7">{renderCalender()}</div>
        <div className="border border-[#ccc]">
          <button onClick={handleClearDate}>清除</button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
