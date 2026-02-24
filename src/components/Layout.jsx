import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// A persistent layout wrapper so Navbar and Footer survive route changes without unmounting
const Layout = () => {
    return (
        <div className="relative w-full min-h-screen bg-charcoal font-sans text-cream selection:bg-flame flex flex-col">
            <Navbar />

            {/* Main content route injection point */}
            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
