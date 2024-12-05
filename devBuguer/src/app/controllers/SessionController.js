import * as Yup from 'yup';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

/*pasta de configuração do token*/
import authConfig from '../../config/auth.js';

class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      //validando se email e senha
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const emailOrPassawordIncorrect = () => {
      res
        .status(401)
        .json({ error: 'make sure your email or passaword are correct' });
    };

    //email ivalido ou valido, se obedece todos os parametros do yup; para assim continuar o codigo->
    const isvalid = await schema.isValid(req.body);

    if (!isvalid) {
      return emailOrPassawordIncorrect();
    }

    //comparando email e senha
    const { email, password } = req.body;

    //entrando dentro do banco de dados conferindo se o email exite, isso retornara true ou false
    const user = await User.findOne({
      where: {
        email,
      },
    });

    //parando a apricação se o email não existir
    if (!user) {
      return emailOrPassawordIncorrect();
    }

    //comparando senha
    const isSamePassword = await user.checkPassword(password);

    //se a senha estiver errada
    if (!isSamePassword) {
      return emailOrPassawordIncorrect();
    }

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
      token: jwt.sign(
        { id: user.id, name: user.name },
        /* <--- validando o token de usuario ---> */
        authConfig.secret,
        {
          /*tempo de duração do teken de segurança*/
          expiresIn: authConfig.expiresId,
        },
      ),
    });
  }
}

export default new SessionController();
