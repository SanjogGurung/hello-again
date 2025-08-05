import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddItem.css';

export default function AddItem({ editItem, clearEdit, setRefreshTrigger }) {
    const [formData, setFormData] = useState({
        itemName: '',
        description: '',
        quantity: '',
        price: '',
        photo: null
    });
    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        if (editItem) {
            setFormData({
                itemName: editItem.itemName,
                description: editItem.description,
                quantity: editItem.quantity,
                price: editItem.price,
                photo: null
            });
            setPhotoPreview(editItem.photo ? `http://localhost:5000/images/${editItem.photo}` : null);
        } else {
            setFormData({ itemName: '', description: '', quantity: '', price: '', photo: null });
            setPhotoPreview(null);
        }
    }, [editItem]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo') {
            const file = files[0];
            setFormData(prev => ({ ...prev, photo: file }));
            if (file) {
                setPhotoPreview(URL.createObjectURL(file));
            } else {
                setPhotoPreview(null);
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('itemName', formData.itemName);
        data.append('description', formData.description);
        data.append('quantity', formData.quantity);
        data.append('price', formData.price);
        if (formData.photo) {
            data.append('photo', formData.photo);
        }

        try {
            if (editItem) {
                const response = await axios.put(`http://localhost:5000/api/items/${editItem.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                console.log('Item updated:', response.data);
                alert('Item updated successfully!');
                clearEdit();
                setRefreshTrigger(prev => prev + 1); // Trigger refresh
            } else {
                const response = await axios.post('http://localhost:5000/api/items', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                console.log('Item created:', response.data);
                alert('Item created successfully!');
                setRefreshTrigger(prev => prev + 1); // Trigger refresh
            }
            setFormData({ itemName: '', description: '', quantity: '', price: '', photo: null });
            setPhotoPreview(null);
        } catch (error) {
            console.error('Error submitting item:', error);
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCancel = () => {
        clearEdit();
        setFormData({ itemName: '', description: '', quantity: '', price: '', photo: null });
        setPhotoPreview(null);
        setRefreshTrigger(prev => prev + 1); // Trigger refresh on cancel
    };

    return (
        <div className="form-container">
            <h2>{editItem ? 'Edit Item' : 'Item Entry Form'}</h2>
            <div>
                <div className="form-group">
                    <label htmlFor="itemName">Item Name</label>
                    <input
                        type="text"
                        id="itemName"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        required
                        placeholder="Enter item name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Enter item description"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        min="1"
                        placeholder="Enter quantity"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        placeholder="Enter price"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Photo</label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/jpeg,image/png"
                        onChange={handleChange}
                    />
                    {photoPreview && (
                        <img
                            src={photoPreview}
                            alt="Photo preview"
                            className="photo-preview"
                        />
                    )}
                </div>
                <button type="button" onClick={handleSubmit}>
                    {editItem ? 'Update Item' : 'Submit'}
                </button>
                {editItem && (
                    <button type="button" onClick={handleCancel} className="cancel-button">
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}