import React from 'react';
import MenuIntro from './MenuIntro';
import MenuHorizontalScroll from './MenuHorizontalScroll';
import MenuHighlight from './MenuHighlight';

const MenuSection = () => {
  return (
    <div id="menu">
      <MenuIntro />
      <MenuHorizontalScroll />
      <MenuHighlight />
    </div>
  );
};

export default MenuSection;
