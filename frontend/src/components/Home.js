import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Home.css';

export default function Home({ cart, onAddToCart }) {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        setFilteredItems(
            items.filter(item =>
                item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, items]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="home">
            <nav className="navbar">
                <h1 className="navbar-logo">Stationary Shop</h1>
                <div className="navbar-content">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/admin" className="nav-link">Admin</Link>
                        <span className="cart-count">Cart ({cart.length})</span>
                    </div>
                </div>
            </nav>
            <div className="products">
                <h2>Our Products</h2>
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
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}