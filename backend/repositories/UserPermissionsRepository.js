import UserPermissions from '../models/UserPermissions.js'

const UserPermissionsRepository = {
  async updatePermission (userId, fieldName, isVisible, expirationDate) {
    // eslint-disable-next-line object-shorthand
    await UserPermissions.upsert({ user_id: userId, field_name: fieldName, is_visible: isVisible, expiration_date: expirationDate })
  },

  async getUserPermissions (userId) {
    return await UserPermissions.findAll({
      where: { user_id: userId },
      attributes: ['field_name', 'is_visible', 'expiration_date']
    })
  }
}

export default UserPermissionsRepository
