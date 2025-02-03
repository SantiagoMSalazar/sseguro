import { DataTypes } from 'sequelize'
import sequelize from '../config/dbAuth.js'
import User from './User.js'

const UserPermissions = sequelize.define(
  'User_Permissions',
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      },
      primaryKey: true
    },
    field_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [
          [
            'nombre',
            'email',
            'cedula',
            'telefono',
            'direccion',
            'fecha_nacimiento'
          ]
        ]
      },
      primaryKey: true
    },
    is_visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: 'user_permissions',
    timestamps: false
  }
)

User.hasMany(UserPermissions, { foreignKey: 'user_id' })
UserPermissions.belongsTo(User, { foreignKey: 'user_id' })

export default UserPermissions
