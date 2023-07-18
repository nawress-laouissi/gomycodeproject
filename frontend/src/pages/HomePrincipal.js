import React from 'react';
import Slider from '../Compnents/Slider';
import FeaturedProducts from '../Compnents/FeaturedProducts';
import GridSection from '../Compnents/GridSection';

function HomePrincipal() {
  return (
    <div className="home">
      <Slider />
      <FeaturedProducts type="featured" />
      <GridSection />
      <FeaturedProducts type="trending" />
    </div>
  );
}

export default HomePrincipal;
