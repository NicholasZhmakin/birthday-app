import React from "react";

const User = ({ user }) => {
  const { firstName, lastName, dob } = user;

  const formatDate = dob => {
    const date = new Date(dob);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return `${dt}/${month}/${year}`;
  };

  return (
    <div className="user">
      <i className="fas fa-user"></i>
      <h5>{firstName}</h5>
      <h5>{lastName}</h5>
      <p>{formatDate(dob)}</p>
    </div>
  );
};

export default User;
