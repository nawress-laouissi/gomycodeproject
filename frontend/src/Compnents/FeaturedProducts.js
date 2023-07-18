import React from 'react';
import Card from './Card';

function FeaturedProducts({ type }) {
  const data = [
    {
      id: 1,
      img: 'https://i.pinimg.com/564x/11/e3/a9/11e3a99a0565882dff58df5278027c10.jpg',
      img2: 'https://i.pinimg.com/564x/77/30/88/773088f540a13ed035734c7da4cdd9ac.jpg',
      title: ' all in white looks',
      isNew: true,
    },
    {
      id: 2,
      img: 'https://i.pinimg.com/564x/49/40/ab/4940ab213f682a731ba587772593f2e6.jpg',
      img2: 'https://i.pinimg.com/564x/4f/7e/f6/4f7ef6a4ccba52bf298d8e944fdddcc0.jpg',
      title: 'make pink your outfit statement',
      isNew: true,
    },
    {
      id: 3,
      img: 'https://i.pinimg.com/564x/c7/bc/79/c7bc79e7eaacd679f8fb14a4c4d8a8bd.jpg',
      img2: 'https://i.pinimg.com/564x/94/17/24/941724f29b95def243cf47efff9619a6.jpg',
      title: ' trendy jeans',
      isNew: true,
    },
    {
      id: 4,
      img: 'https://i.pinimg.com/564x/3f/5f/ea/3f5fea446049ed8483afcb3a1a10dd64.jpg',
      img2: 'https://i.pinimg.com/564x/90/87/f7/9087f7fcc18c187598964ce0c126ccb8.jpg',
      title: ' black and white elegance',
      isNew: true,
    },
  ];
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1 className="title"> {type} products </h1>
        <p className="words"> check out our {type} products! </p>
      </div>
      <div className=" bottom">
        {data.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
