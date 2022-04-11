import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../views/Dashboard";
import NotFound from "../../views/NotFound";
import Login from "../../views/Login";
import User from "../../views/User";
import Event from "../../views/Event";
import Register from "../../views/Register";
import ProtectedRoute from "../protectors/ProtectedRoute";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<><Login/><Register/></>}/>
          <Route element={<ProtectedRoute/>}>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/user" element={<User />} />
          </Route>
          <Route path="/event/:id" element={<Event event />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
