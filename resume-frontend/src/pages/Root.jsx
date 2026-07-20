

import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navBar";   // 👈 path apne folder structure ke hisaab se adjust karo

function Root() {
    const [showNavbar, setShowNavbar] = useState(true);

    return (
        <>
            <Navbar showNavbar={showNavbar} />
            <Outlet context={{ showNavbar, setShowNavbar }} />
        </>
    );
}

export default Root;