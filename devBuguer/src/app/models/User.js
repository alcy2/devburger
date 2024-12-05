//model consegue comunicar nosso codigo com o banco de dados, nós conseguimos ver oque tem la no banco de daddos, pra nosso codigo
//saber oque tem la no banco de dados, ele que fara nossa interface

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
  static init(sequelize) {
    // method static, acesso os metodos sem precisar instaciar a class
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        passaword_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize, // objeto de configuração, contem o banco que será acessado
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.passaword_hash = await bcrypt.hash(user.password, 10);
      }
    });
    return this;
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.passaword_hash);
  }
}

export default User;

//const user = new User()

/*
forma secundaria, mais elaborada

user.init(sequeleize) {
    super.init(
    {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
    },
    {
        sequelize,
      },
    )
}
)

*/
