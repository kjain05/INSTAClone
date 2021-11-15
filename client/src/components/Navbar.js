import React from "react";

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper light-green" >
                <a href="#" className="brand-logo left">Logo</a>
                <ul id="nav-mobile" className="right ">
                    <li><a href="sass.html"></a></li>
                    <li><a href="badges.html"></a></li>
                    <li><a href="collapsible.html"></a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar