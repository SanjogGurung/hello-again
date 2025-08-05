import pool from '../config/database.js';

class UserService {
    async getAllUsers() {
        const [rows] = await pool.query("SELECT * FROM users");
        return rows;
    }

    async getUserById(id) {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
    }

    async createUser(userData) {
        const { name, email, password } = userData;
        const [result] = await pool.query(
            "INSERT INTO users (name, description, quantity, price) VALUES (?, ?, ?, ?)",
            [name, email, password]
        );
        return { id: result.insertId, name, email };
    }
}

export default new UserService();