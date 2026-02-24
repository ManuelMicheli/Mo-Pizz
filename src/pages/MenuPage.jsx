import React, { useLayoutEffect } from 'react';
import Menu from '../components/Menu';

const MenuPage = () => {

    // Ensure we start at the top of the page when navigating here
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 min-h-screen bg-charcoal">
            <Menu />
        </div>
    );
};

export default MenuPage;
