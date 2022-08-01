const Sequelize = require(`Sequelize`)
const env = process.env.NODE_ENV || `development`;
const config = require(`../config/config`)[env]
const db= {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.Performance = require(`./performance`)(sequelize,Sequelize)
db.User = require(`./user`)(sequelize,Sequelize)
db.Seat = require(`./seat`)(sequelize,Sequelize)
db.Ticket = require(`./ticket`)(sequelize,Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
