import { DataTypes } from 'sequelize'
import sequelize from '../config/dbAuth.js'

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Genera un UUID automáticamente
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(30),
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  cedula: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY, // DATEONLY para almacenar solo la fecha (sin hora)
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW // Valor por defecto: fecha y hora actual
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW // Valor por defecto: fecha y hora actual
  },
  rol: {
    type: DataTypes.ENUM('admin', 'usuario'), // Solo puede ser 'admin' o 'user'
    allowNull: false,
    defaultValue: 'usuario'
  },

  genero: {
    type: DataTypes.ENUM('masculino', 'femenino', 'otro'),
    allowNull: false
  },
  ocupacion: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
}, {
  tableName: 'users', // Nombre de la tabla en la base de datos
  timestamps: false, // Desactiva los timestamps automáticos de Sequelize (createdAt y updatedAt)
  hooks: {
    beforeUpdate: (user) => {
      user.updated_at = new Date() // Actualiza updated_at antes de guardar
    }
  }
})
User.associate = models => {
  User.hasMany(models.UserPermission, {
    foreignKey: 'user_id',
    as: 'permissions'
  })
}

export default User
