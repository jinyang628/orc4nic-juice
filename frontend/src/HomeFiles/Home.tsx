import React from 'react';
import HighlightItem from './HighlightItem';
import carrotJuice from "../Images/carrotJuice.jpg";
import celeryJuice from "../Images/celeryJuice.jpg";
import FrontPageContent from "./Body";

export default function Home() {
  return (
    <div>
      <div className="content">
        <HighlightItem 
            image={celeryJuice}
            price="2.80"
            full_stars = {4}
            half_stars = {1}
            soldOut={false}
        />
        <FrontPageContent />
        <HighlightItem
            image={carrotJuice}
            price="2.30"
            full_stars = {4}
            half_stars = {0}
            soldOut={true}
        />
      </div>
    </div>
    
  );
}