import ItemService from '../services/ItemService.js';
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only JPEG and PNG images are allowed'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).single('photo');

const getItems = async (req, res, next) => {
    try {
        const items = await ItemService.getAllItems();
        res.json(items);
    } catch (error) {
        next(error);
    }
};

const getItemById = async (req, res, next) => {
    try {
        const item = await ItemService.getItemById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        next(error);
    }
};

const createItem = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return next(new Error(err.message));
        }
        try {
            const itemData = {
                itemName: req.body.itemName,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                photo: req.file ? req.file.filename : null
            };
            const item = await ItemService.createItem(itemData);
            res.status(201).json(item);
        } catch (error) {
            next(error);
        }
    });
};

const updateItem = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return next(new Error(err.message));
        }
        try {
            const itemData = {
                itemName: req.body.itemName,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                photo: req.file ? req.file.filename : req.body.photo // Keep existing photo if no new file
            };
            const item = await ItemService.updateItem(req.params.id, itemData);
            res.json(item);
        } catch (error) {
            next(error);
        }
    });
};

const deleteItem = async (req, res, next) => {
    try {
        await ItemService.deleteItem(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default { getItems, getItemById, createItem, updateItem, deleteItem };