import React from 'react';
import { data } from './Data';

function Product() {
  return (
    <div>
      {data.products.map((product) => (
        <h1>
          {product.id} and {product.description}
        </h1>
      ))}
    </div>
  );
}

export default Product;
