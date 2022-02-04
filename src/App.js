import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SessionDataProvider } from "./contexts/SessionDataContext";

export default function App(){



    return(
        <>
            <AuthProvider>
                <SessionDataProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Login/>} ></Route>
                            <Route path='/sign-up' element={<SignUp/>} ></Route>
                            <Route path='/mainpage' element={<MainPage/>} ></Route>
                        </Routes>
                    </BrowserRouter>
                </SessionDataProvider>
            </AuthProvider>
        </>
        
    )
}