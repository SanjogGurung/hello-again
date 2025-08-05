import React from 'react';
import './ProductCard.css';

export default function ProductCard({ item, onAddToCart, onEdit, onDelete }) {
    return (
        <div className="product-card">
            {item.photo ? (
                <img
                    src={`http://localhost:5000/images/${item.photo}`}
                    alt={item.itemName}
                    className="product-image"
                />
            ) : (
                <div className="no-image">No Image</div>
            )}
            <div className="product-details">
                <h3 className="product-name">{item.itemName}</h3>
                <p className="product-price">${item.price.toFixed(2)}</p>
                <div className="product-actions">
                    {onAddToCart ? (
                        <button
                            className="add-to-cart-button"
                            onClick={() => onAddToCart(item)}
                        >
                            Add to Cart
                        </button>
                    ) : (
                        <>
                            <button className="edit-button" onClick={() => onEdit(item)}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={() => onDelete(item.id)}>
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}