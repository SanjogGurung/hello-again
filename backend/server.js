import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import ItemController from './controllers/itemController.js';

// Manually specify the .env file path
dotenv.config({ path: 'D:\\NodeExample\\backend\\.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/images', express.static('images')); // Serve images
app.get('/api/items', ItemController.getItems);
app.get('/api/items/:id', ItemController.getItemById);
app.post('/api/items', ItemController.createItem);
app.put('/api/items/:id', ItemController.updateItem);
app.delete('/api/items/:id', ItemController.deleteItem);

// Sample API route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});