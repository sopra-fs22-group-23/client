import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../../views/Dashboard";
import NotFound from "../../views/NotFound";
import Login from "../../views/Login";
import User from "../../views/User";
import Event from "../../views/Event";
import TaskSession from "../../views/TaskSession";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user" element={<User />} />
        <Route path="/event" element={<Event />} />
        <Route path="/taskSession/:eventID" element={<TaskSession />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;