import Item from '../models/Item.js';
import pool from '../config/database.js';

class ItemService {
    async getAllItems() {
        const [rows] = await pool.query('SELECT * FROM item');
        return rows.map(row => new Item(
            row.name,
            row.description,
            row.quantity,
            row.price,
            row.photo,
            row.id
        ).toJSON());
    }

    async getItemById(id) {
        const [rows] = await pool.query('SELECT * FROM item WHERE id = ?', [id]);
        if (rows.length === 0) {
            throw new Error('Item not found');
        }
        const row = rows[0];
        return new Item(
            row.name,
            row.description,
            row.quantity,
            row.price,
            row.photo,
            row.id
        ).toJSON();
    }

    async createItem(itemData) {
        try {
            const item = new Item(
                itemData.itemName,
                itemData.description,
                itemData.quantity,
                itemData.price,
                itemData.photo
            );
            item.validate();
            const [result] = await pool.query(
                'INSERT INTO item (name, description, quantity, price, photo) VALUES (?, ?, ?, ?, ?)',
                [item.itemName, item.description, item.quantity, item.price, item.photo]
            );
            item.id = result.insertId;
            return item.toJSON();
        } catch (error) {
            throw new Error(`Failed to create item: ${error.message}`);
        }
    }

    async updateItem(id, itemData) {
        try {
            const item = new Item(
                itemData.itemName,
                itemData.description,
                itemData.quantity,
                itemData.price,
                itemData.photo,
                id
            );
            item.validate();
            const [result] = await pool.query(
                'UPDATE item SET name = ?, description = ?, quantity = ?, price = ?, photo = ? WHERE id = ?',
                [item.itemName, item.description, item.quantity, item.price, item.photo, id]
            );
            if (result.affectedRows === 0) {
                throw new Error('Item not found');
            }
            return item.toJSON();
        } catch (error) {
            throw new Error(`Failed to update item: ${error.message}`);
        }
    }

    async deleteItem(id) {
        try {
            const [result] = await pool.query('DELETE FROM item WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Item not found');
            }
            return true;
        } catch (error) {
            throw new Error(`Failed to delete item: ${error.message}`);
        }
    }
}

export default new ItemService();