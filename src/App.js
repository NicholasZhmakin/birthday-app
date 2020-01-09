import React, { useState, useEffect } from "react";
import axios from "axios";
import Month from "./components/Month";
import User from "./components/User";

const App = () => {
  useEffect(() => {
    initUsers();
  }, []);

  const [users, setUsers] = useState([]);
  const [usersWithBirthday, setUsersWithBirthday] = useState([]);
  const [serverError, setServerError] = useState(false);

  const initUsers = async () => {
    try {
      const response = await axios.get(
        "https://yalantis-react-school.herokuapp.com/api/task0/users"
      );
      setUsers(response.data);
      setServerError(false);
    } catch (error) {
      setServerError(true);
    }
  };

  const findUsers = index => {
    const neededUsers = users.filter(user => {
      const birthdayMonth = new Date(user.dob).getMonth();
      return birthdayMonth === index;
    });
    setUsersWithBirthday(neededUsers);
  };

  const setColor = index => {
    let color;
    const numberOfUsers = users.filter(user => {
      const birthdayMonth = new Date(user.dob).getMonth();
      return birthdayMonth === index;
    }).length;
    if (numberOfUsers >= 3 && numberOfUsers <= 6) {
      color = "#3d2e94";
    } else if (numberOfUsers >= 7 && numberOfUsers <= 10) {
      color = "#01a101";
    } else if (numberOfUsers >= 11) {
      color = "#b82020";
    } else {
      color = "#969696";
    }
    return color;
  };

  const mounths = [
    "January",
    "February",
    "March ",
    "April ",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let content;
  if ((users === null || users.length === 0) && !serverError) {
    content = <div className="loader">Loading...</div>;
  } else if (serverError) {
    content = <h2 className="error">Something went wrong...</h2>;
  } else {
    content = (
      <React.Fragment>
        <h1 className="title">
          <i className="fas fa-birthday-cake"></i>when someone's birthday?
          <i className="fas fa-gift"></i>
        </h1>
        <section className="months">
          {mounths.map((month, index) => (
            <Month
              key={month}
              index={index}
              title={month}
              findUsers={findUsers}
              setColor={setColor}
              setUsersWithBirthday={setUsersWithBirthday}
            />
          ))}
        </section>

        <section className="users">
          {usersWithBirthday.map(user => (
            <User key={user.id} user={user} />
          ))}
        </section>
      </React.Fragment>
    );
  }

  return <div className="App">{content}</div>;
};

export default App;
