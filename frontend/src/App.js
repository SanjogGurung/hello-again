import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import axios from 'axios';

export default function App() {
    const [cart, setCart] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleAddToCart = (item) => {
        setCart(prev => [...prev, { ...item, quantity: 1 }]);
        alert(`${item.itemName} added to cart!`);
    };

    const handleEdit = (item) => {
        setEditItem(item);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:5000/api/items/${id}`);
                console.log('Item deleted:', id);
                alert('Item deleted successfully!');
                setRefreshTrigger(prev => prev + 1);
            } catch (error) {
                console.error('Error deleting item:', error);
                alert(`Error: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home cart={cart} onAddToCart={handleAddToCart} />}
                />
                <Route
                    path="/admin"
                    element={
                        <Admin
                            editItem={editItem}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            clearEdit={() => setEditItem(null)}
                            setRefreshTrigger={setRefreshTrigger}
                            refreshTrigger={refreshTrigger}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}