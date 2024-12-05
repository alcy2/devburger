export default {
  dialect: 'postgres', //tipo de banco de dados
  host: 'localhost',
  username: 'postgres',
  password: 'postgres', // senha do banco de dados
  database: 'devburger', // nome do arquivo dentro do banco de dados
  define: {
    timestamps: true, //mostra quando o arquivo foi criado, mostra as alteraçoes que foram feitas tambem
    underscored: true,
    underscoredAll: true,
  },
};
