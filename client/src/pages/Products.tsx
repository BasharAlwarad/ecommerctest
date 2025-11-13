import React from 'react';
import { useUser } from '../context/usercontext';

const Products = () => {
  const { products } = useUser();
  console.log(products);
  return <div>Products</div>;
};

export default Products;
