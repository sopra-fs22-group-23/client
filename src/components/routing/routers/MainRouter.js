import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../../views/Dashboard";
import NotFound from "../../views/NotFound";
import Login from "../../views/Login";




const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/home' element={<Dashboard/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;