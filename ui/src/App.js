import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { PublicPage } from './pages/PublicPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { RequireAuth } from './components/RequireAuth';
import LostPetRegister from './pages/LostPetRegister';
import PetList from './pages/PetList';
import NavBar from './components/NavBar';
import {KennelPage} from "./pages/KennelPage";
import {KennelRegister} from "./pages/KennelRegister";
import {PetEdit} from "./pages/PetEdit"
import {KennelLogin} from "./pages/KennelLogin";
import {LostPetsPage} from "./pages/FlyerMenu";
import {CurrentPetRegister} from "./pages/CurrentPetRegister";

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<PublicPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/lost-pet" element={<LostPetRegister />} />
                <Route path="/list" element={<PetList />} />
                <Route path="/vet-kennel" element={<KennelPage />} />
                <Route path="/edit-pet" element={<PetEdit/>} />
                <Route path="/new-association" element={<KennelRegister/>} />
                <Route path="/existing-association" element={<KennelLogin/>} />
                <Route path="/own-flyer-menu" element={<LostPetsPage/>} />
                <Route path="/register-current-pet" element={<CurrentPetRegister/>} />
                <Route
                    path="/home"
                    element={
                        <RequireAuth>
                            <HomePage />
                        </RequireAuth>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
