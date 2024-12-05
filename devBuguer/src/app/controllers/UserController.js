/*
 * store -> cadastrar / adicionar
 * index => listar varios
 * show -> listar apenas um
 * update -> atualizar
 * delete -> deletar
 */

import User from '../models/User.js';
import { v4 } from 'uuid';
import * as Yup from 'yup'; // validação de dados

class UserController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().strict(true).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      res.status(400).json({ error: err.errors });
    }

    const { name, email, password, admin } = req.body;

    //verificar email
    const userExisting = await User.findOne({
      //findOne selecionar um. where (onde) email é igual ao email cadastrado no req.body
      where: {
        email,
      },
    });

    if (userExisting) {
      res.status(409).json({ error: 'User already exists' });
    }

    await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    });

    return res.status(201).json({
      name,
      email,
      admin,
    });
  }
}

export default new UserController();
