import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddItem from './AddItem';
import AllProducts from './AllProducts';
import './Admin.css';

export default function Admin({ editItem, onEdit, onDelete, clearEdit, setRefreshTrigger, refreshTrigger }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="admin">
            <nav className="navbar">
                <h1 className="navbar-logo">Stationary Shop - Admin</h1>
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
                    </div>
                </div>
            </nav>
            <AddItem
                editItem={editItem}
                clearEdit={clearEdit}
                setRefreshTrigger={setRefreshTrigger}
            />
            <AllProducts
                onEdit={onEdit}
                onDelete={onDelete}
                refreshTrigger={refreshTrigger}
                searchTerm={searchTerm}
            />
        </div>
    );
}