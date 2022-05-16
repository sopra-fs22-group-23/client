import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../views/Dashboard";
import NotFound from "../../views/NotFound";
import User from "../../views/User";
import Event from "../../views/Event/Event";
import ProtectedRoute from "../protectors/ProtectedRoute";
import CreateEvent from "../../views/Event/CreateEvent";
import EventEdit from "../../views/Event/EventEdit";
import TaskSession from "../../views/TaskSession/TaskSession";
import React from "react";
import Landing from "../../views/Landing";
import TitleScreen from "../../views/TitleScreen";
import "../../../styles/views/Landing.scss"

const MainRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <>
                <div className={"row"}>
                    <div className={"col-6"}><TitleScreen/></div>
                    <div className={"col-6"}><div className={"view"}><Landing /></div></div>
                </div>
            </>
            }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/taskSession/:eventID" element={<TaskSession/>} />
          <Route path="/event/create" element={<CreateEvent create />} />
          <Route path="/event/:eventId/edit" element={<EventEdit edit />} />
          <Route path="/landing" element={<Landing />} />
        </Route>

        <Route path="/event/:eventId" element={<Event event />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
