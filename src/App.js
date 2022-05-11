import MainRouter from "./components/routing/routers/MainRouter";
import Header from "./components/ui/StandardComponents/Header";
import {useLoadScript} from "@react-google-maps/api";


const libraries = ["places"]
function App() {

    useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

return (
<>
  <MainRouter />
</>
);
}

export default App;
