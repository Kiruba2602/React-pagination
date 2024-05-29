import React, { useEffect, useState } from 'react';
import fetchData from '../api';

export const Pagination = () => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            const data = await fetchData(currentPage, itemsPerPage);
            setItems(data.items);
            setTotalItems(data.totalItems);
            setLoading(false);
        };
        loadItems();
    }, [currentPage]);

    const totalPages = Math.ceil(totalItems/itemsPerPage);

    const handlePageChange = (newPage) => {
        if(newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

  return (
    <div>
        <h1>React Pagination</h1>
        {loading ? 
            (<p>loading...</p>
        ):(
            <ul>
                {items.map((item) => (
                <li key={item.id}>
                    <img src={item.image} alt={item.title} width='200px' height='200px'/>
                    <p>Product Name: {item.title}</p>
                    <p>Price: ${item.price}</p>
                </li>
            ))}
            </ul>
        )}
        <div>
            <button onClick={() => handlePageChange(currentPage-1)} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled= {currentPage === totalPages}>Next</button>
        </div>
    </div>
  );
};

export default Pagination;