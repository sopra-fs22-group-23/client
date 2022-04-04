import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../views/Dashboard";
import NotFound from "../../views/NotFound";
import Login from "../../views/Login";
import User from "../../views/User";
import Event from "../../views/Event";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user" element={<User />} />
        <Route path="/event" element={<Event />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
