import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../views/Dashboard";
import NotFound from "../../views/NotFound";
import Login from "../../views/Login/Login";
import User from "../../views/User";
import Event from "../../views/Event/Event";
import Register from "../../views/Login/Register";
import ProtectedRoute from "../protectors/ProtectedRoute";
import CreateEvent from "../../views/Event/CreateEvent";
import EventEdit from "../../views/Event/EventEdit";
import TaskSession from "../../views/TaskSession/TaskSession";
import React from "react";
import PlacesInput from "../../views/PlacesInput";
import Landing from "../../views/Landing";

const MainRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/taskSession/:eventID" element={<TaskSession/>} />
        </Route>
        <Route
            exact
            path="/login"
            element={
              <>
                <Login />
                <Register />
              </>
            }
        />
        <Route path="/event/:eventId" element={<Event event />} />
        <Route path="/event/create" element={<CreateEvent create />} />
        <Route path="/event/:eventId/edit" element={<EventEdit edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
