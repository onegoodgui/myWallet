import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import NewEarning from "./pages/NewEarning";
import NewExpense from "./pages/NewExpense";
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
                            <Route path='/new_earning' element={<NewEarning/>} ></Route>
                            <Route path='/new_expense' element={<NewExpense/>} ></Route>
                        </Routes>
                    </BrowserRouter>
                </SessionDataProvider>
            </AuthProvider>
        </>
        
    )
}