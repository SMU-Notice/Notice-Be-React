import {Outlet} from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

export default RootLayout;