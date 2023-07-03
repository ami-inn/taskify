import React from "react";
import UserSidebar from "../UserSidebar/UserSidebar";
import UserHeder from "../UserHeader/UserHeder";
import Calendar from "react-awesome-calendar";
function UserCalendar() {
  const events = [
    {
      id: 1,
      color: "#fd3153",
      from: "2019-05-02T18:00:00+00:00",
      to: "2019-05-05T19:00:00+00:00",
      title: "This is an event",
    },
    {
      id: 2,
      color: "#1ccb9e",
      from: "2019-05-01T13:00:00+00:00",
      to: "2019-05-05T14:00:00+00:00",
      title: "This is another event",
    },
    {
      id: 3,
      color: "#3694DF",
      from: "2019-05-05T13:00:00+00:00",
      to: "2019-05-05T20:00:00+00:00",
      title: "This is also another event",
    },
  ];
  return (
    <div className="wrapper">
      <UserSidebar page={"calendar"} />
      <UserHeder />
      <div className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Calendar events={events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCalendar;
