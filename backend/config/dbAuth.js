// config/db.js
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DB_NAME || 'auth_db',
  process.env.DB_USER || 'admin',
  process.env.DB_PASSWORD || 'securepassword123',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false // Desactiva los logs de SQL en producción
  }
)

export default sequelize
