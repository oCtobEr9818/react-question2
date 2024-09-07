import React from "react";
import Calendar from "./Calendar/Calendar";

const App = () => {
  return (
    <div className="flex">
      <Calendar title="Task1" />
      <Calendar title="Task2" isCrossMonth={true} />
    </div>
  );
};

export default App;
