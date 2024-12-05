import * as Yup from 'yup';
import Category from '../models/category.js';
import User from '../models/User.js';
import category from '../models/category.js';

class categoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
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
    const { name } = req.body;

    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    });

    if (categoryExists) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const { id } = await Category.create({
      name,
      path,
    });

    return res.status(201).json({ id, name });
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
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

    const categoryExists = await category.findByPk(id);

    if (!categoryExists) {
      return res
        .status(400)
        .json({ message: 'make sure your category ID is correct' });
    }

    let path;
    if (req.file) {
      path = res.file.filename;
    }

    const { name } = req.body;

    if (name) {
      const categoryExistsName = await Category.findOne({
        where: {
          name,
        },
      });

      if (categoryExistsName && categoryExistsName.id != id) {
        return res.status(400).json({ error: 'Category already exists' });
      }
    }

    await category.update(
      {
        name,
        path,
      },
      {
        where: {
          id,
        },
      },
    );

    return res.status(200).json({});
  }

  async index(req, res) {
    const category = await Category.findAll();

    return res.json(category);
  }
}

export default new categoryController();
