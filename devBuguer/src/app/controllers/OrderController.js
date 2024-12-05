// import * as Yup from 'yup';
import Order from '../schemas/Order.js';
import Yup from 'yup';
import Category from '../models/category.js';
import Product from '../models/Products.js';
import User from '../models/User.js';

class OrderController {
  async store(req, res) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      res.status(400).json({ error: err.errors });
    }

    const { products } = req.body;

    const productsIds = products.map((product) => product.id);

    const findProducts = await Product.findAll({
      where: {
        id: productsIds,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });

    const formattedProducts = findProducts.map((product) => {
      const productindex = products.findIndex((item) => item.id === product.id);

      const newProduct = {
        id: product.id,
        name: product.name,
        category: product.category.name,
        price: product.price,
        url: product.url,
        quantity: products[productindex].quantity,
      };

      return newProduct;
    });

    const order = {
      user: {
        id: req.userid,
        name: req.username,
      },
      products: formattedProducts,
      status: 'Pedido realizado',
    };

    const createdOder = await Order.create(order);

    return res.status(201).json(createdOder);
  }

  async index(req, res) {
    const orders = await Order.find();

    return res.json(orders);
  }

  async update(req, res) {
    const schema = Yup.object({
      status: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = User.findByPk(req.userid);

    if (!isAdmin) {
      return res.status(401).json();
    }

    const { id } = req.params;
    const { status } = req.body;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      res.status(400).json({ error: err.errors });
    }

    return res.json({ message: 'status update sucessfully' });
  }
}

export default new OrderController();
