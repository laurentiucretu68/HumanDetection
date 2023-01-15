import NavbarFunction from "../components/NavbarFunction";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <>
            <NavbarFunction/>
            <Outlet/>
        </>
    )
}

export default Layout;