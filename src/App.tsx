// npm modules
import React, { useEffect, createContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// page components
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import Profiles from "./pages/Profiles/Profiles";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ProfilePage from "./pages/Profile/Profile";
import Level1 from "./pages/Levels/Level1";

// components
import NavBar from "./Components/NavBar/NavBar";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

// services
import * as authService from "./Services/authService";

// stylesheets
import "./css/app.css";

//utils
import calculate from "./utils/math";
// types
import { Profile, User } from "./types/models";
import Completed from "./pages/Levels/Completed";

function App(): JSX.Element {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(authService.getUser());

    const handleLogout = (): void => {
        authService.logout();
        setUser(null);
        navigate("/");
    };

    const handleAuthEvt = (): void => {
        setUser(authService.getUser());
    };

    console.log(calculate(5, 10));

    return (
        <>
            {user && <NavBar user={user} handleLogout={handleLogout} />}
            <Routes>
                <Route path="/" element={<Landing user={user} />} />
                {/* <Route path="/test" element={<TestComponent />} /> */}
                <Route
                    path="/signup"
                    element={<Signup handleAuthEvt={handleAuthEvt} />}
                />
                <Route
                    path="/login"
                    element={<Login handleAuthEvt={handleAuthEvt} />}
                />
                <Route
                    path="/profiles"
                    element={
                        <ProtectedRoute user={user}>
                            <Profiles />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/change-password"
                    element={
                        <ProtectedRoute user={user}>
                            <ChangePassword handleAuthEvt={handleAuthEvt} />
                        </ProtectedRoute>
                    }
                />
                <Route path="/level1" element={<Level1 />} />
                <Route path="/completed" element={<Completed />} />
            </Routes>
        </>
    );
}

export default App;
