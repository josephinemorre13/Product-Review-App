import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <>
            <nav>
                <ul>
                    {/* <li>
                        <Link to="/">Home</Link>
                    </li> */}
                    <li>
                        <Link to="/products">Product Listing Page</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;