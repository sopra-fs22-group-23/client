import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../views/Dashboard";
import NotFound from "../../views/NotFound";
import User from "../../views/User";
import Event from "../../views/Event/Event";
import ProtectedRoute from "../protectors/ProtectedRoute";
import CreateEvent from "../../views/Event/CreateEvent";
import TaskSession from "../../views/TaskSession/TaskSession";
import React from "react";
import Landing from "../../views/Landing";
import TitleScreen from "../../views/TitleScreen";
import "../../../styles/views/Landing.scss"
import MyProfile from "../../views/MyProfile";
import UserEdit from "../../views/UserEdit";

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
          <Route path="/user/:userId" element={<User />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/profile/edit" element={<UserEdit edit />} />
          <Route path="/taskSession/:eventID" element={<TaskSession/>} />
          <Route path="/event/create" element={<CreateEvent create />} />
          <Route path="/browse" element={<Landing />} />
        </Route>
        <Route path="/event/:eventId" element={<Event event />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
