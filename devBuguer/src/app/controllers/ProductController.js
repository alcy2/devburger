import * as Yup from 'yup';
import Products from '../models/Products.js';
import category from '../models/category.js';
import User from '../models/User.js';

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      res.status(400).json({ error: err.errors });
    }

    // const { admin: isAdmin } = User.findByPk(req.userid);

    // if (!isAdmin) {
    //   return res.status(401).json();
    // }

    const { filename: path } = req.file;
    const { name, price, category_id, offer } = req.body;

    const product = await Products.create({
      name,
      price,
      category_id,
      path,
      offer,
    });

    return res.status(201).json({ product });
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
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

    const findProduct = await Products.findByPk(id);

    if (!findProduct) {
      return res
        .status(400)
        .json({ erro: 'make sure your product ID is correct' });
    }

    if (req.file) {
      path = res.file.filename;
    }
    let path;


    const { name, price, category_id, offer } = req.body;

    await Products.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      {
        where: {
          id,
        },
      },
    );

    return res.status(201).json({});
  }

  async index(req, res) {
    const products = await Products.findAll({
      include: [
        {
          model: category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(products);
  }
}

export default new ProductController();
