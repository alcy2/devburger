// import { Router } from 'express';
import pkg from 'express';
const { Router } = pkg;
import multer from 'multer';
import { Storage } from './config/multer.js';

import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import authMiddleware from './app/middlewares/auth.js';
import categoryController from './app/controllers/categoryController.js';
import OrderController from './app/controllers/OrderController.js';

const router = new Router();

const upload = multer({ storage: Storage });

router.post('/users', UserController.store);
router.post('/session', SessionController.store);

router.use(authMiddleware);
router.post('/products', upload.single('file'), ProductController.store);
router.get('/products', ProductController.index);
router.put('/products/:id', upload.single('file'), ProductController.update);

router.post('/categories', upload.single('file'), categoryController.store);
router.get('/categories', categoryController.index);
router.put('/categories/:id', upload.single('file'), categoryController.update);

router.post('/orders', OrderController.store);
router.get('/orders', OrderController.index);
router.put('/orders/:id', OrderController.update);

export default router;
