import './App.css';
import {
    Route
} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {PublicPage} from "./pages/PublicPage";
import {Routes} from "react-router";
import {RegisterPage} from "./pages/RegisterPage";
import {HomePage} from "./pages/HomePage";
import {RequireAuth} from "./components/RequireAuth";
import LostPetRegister from "./pages/LostPetRegister";
import PetList from "./pages/PetList";

function App() {
    return (
        <Routes>
            <Route path="/" element={<PublicPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/lost-pet" element={<LostPetRegister/>}/>
            <Route path="/list" element={<PetList/>}/>
            <Route
                path="/home"
                element={
                    <RequireAuth>
                        <HomePage/>
                    </RequireAuth>
                }
            />
        </Routes>
    );
}

export default App;
