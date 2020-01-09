import React from "react";

const Month = ({ title, index, findUsers, setColor, setUsersWithBirthday }) => {
  return (
    <div
      style={{ borderLeftColor: `${setColor(index)}` }}
      className="month"
      onMouseOver={() => findUsers(index)}
      onMouseOut={() => setUsersWithBirthday([])}
    >
      <h2>{title}</h2>
    </div>
  );
};

export default Month;
