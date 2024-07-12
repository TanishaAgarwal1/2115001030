import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import Filter from './Filter';
import Sort from './Sort';
import Pagination from './Pagination';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products', {
        params: {
          top: 10,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzc1ODY0LCJpYXQiOjE3MjA3NzU1NjQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjJiZTgzN2NhLWQ3MTUtNDBjZC05MGIyLTFlNGJmNmNjYmM5YyIsInN1YiI6InRhbmlzaGEuYWdhcndhbF9jczIxQGdsYS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6IkdMQVVuaXZlcnNpdHkiLCJjbGllbnRJRCI6IjJiZTgzN2NhLWQ3MTUtNDBjZC05MGIyLTFlNGJmNmNjYmM5YyIsImNsaWVudFNlY3JldCI6IllRaWlXbXhaVkVHcUxpV3MiLCJvd25lck5hbWUiOiJUYW5pc2hhIEFnYXJ3YWwiLCJvd25lckVtYWlsIjoidGFuaXNoYS5hZ2Fyd2FsX2NzMjFAZ2xhLmFjLmluIiwicm9sbE5vIjoiMjExNTAwMTAzMCJ9._L_hK_5O9lD0pWa_5cAQxWGLR_ZazpAeoOD3VNuKS5Y`,  
        },
      });
      setProducts(response.data);
      setTotalPages(Math.ceil(response.data.length / 10));
    };

    fetchProducts();
  }, [filters, sort, page]);

  return (
    <div>
      <Filter setFilters={setFilters} />
      <Sort setSort={setSort} />
      <ProductList products={products} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Home;
