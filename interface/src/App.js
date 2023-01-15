import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NoPage from "./pages/NoPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardPage from "./pages/DashboardPage";
import SignOutPage from "./pages/SignOutPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="/dashboard" element={<DashboardPage/>}/>
                        <Route path="*" element={<NoPage/>}/>
                    </Route>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/sign-out" element={<SignOutPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
