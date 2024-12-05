import jwt from 'jsonwebtoken';
import auth from '../../config/auth.js';

function authMiddleware(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ erro: 'Token not provided' });
  }

  const token = authToken.split(' ').at(1);

  try {
    jwt.verify(token, auth.secret, (err, decoded) => {
      if (err) {
        throw new Error();
      }

      req.userid = decoded.id;
      req.username = decoded.name;
    });
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid', err });
  }

  next();
}

export default authMiddleware;
