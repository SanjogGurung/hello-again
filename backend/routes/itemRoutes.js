import express from 'express';
import itemController from '../controllers/itemController.js';

const itemRouter = express.Router();

itemRouter.get('/', itemController.getItems);
itemRouter.get('/:id', itemController.getItemById);
itemRouter.post('/', itemController.createItem);

export default itemRouter;