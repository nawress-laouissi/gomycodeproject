import React from 'react';

function Card({ item }) {
  return (
    <div className="card">
      <div className="image">
        <img src={item.img} alt="" className="mainImg size"></img>
        <img src={item.img2} alt="" className="secondImg size"></img>
      </div>
      <h2 className="title"> {item.title}</h2>
    </div>
  );
}

export default Card;
