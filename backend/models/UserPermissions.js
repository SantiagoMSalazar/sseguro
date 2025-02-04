// models/UserPermission.js
import { DataTypes } from 'sequelize'
import sequelize from '../config/dbAuth.js'
import User from './User.js'

const UserPermission = sequelize.define('UserPermission', {
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  field_name: {
    type: DataTypes.ENUM(
      'nombre', 'email', 'cedula', 'telefono',
      'direccion', 'fecha_nacimiento'
    ),
    allowNull: false,
    primaryKey: true
  },
  is_visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'user_permissions',
  timestamps: false,
  underscored: true
})
User.hasMany(UserPermission, {
  foreignKey: 'user_id',
  as: 'permissions'
})

export default UserPermission
