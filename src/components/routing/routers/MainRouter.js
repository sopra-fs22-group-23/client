import {BrowserRouter, Route, Routes} from "react-router-dom";
import Logo from "../../views/Logo";
import Dashboard from "../../views/Dashboard";
import NotFound from "../../views/NotFound";




const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Logo/>} />
                <Route path='/home' element={<Dashboard/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;