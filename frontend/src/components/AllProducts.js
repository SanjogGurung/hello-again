import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './AllProducts.css';

export default function AllProducts({ onEdit, onDelete, refreshTrigger, searchTerm }) {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('AllProducts refreshTrigger:', refreshTrigger); // Debug log
        const fetchItems = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                setItems(response.data);
                setFilteredItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
                setError(error.response?.data?.message || error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, [refreshTrigger]);

    useEffect(() => {
        setFilteredItems(
            items.filter(item =>
                item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, items]);

    return (
        <div className="all-products">
            <h2>Products</h2>
            {isLoading && <p className="loading">Loading products...</p>}
            {error && <p className="error-message">{error}</p>}
            {filteredItems.length === 0 && !isLoading && !error ? (
                <p>No products found.</p>
            ) : (
                <div className="product-grid">
                    {filteredItems.map(item => (
                        <ProductCard
                            key={item.id}
                            item={item}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}