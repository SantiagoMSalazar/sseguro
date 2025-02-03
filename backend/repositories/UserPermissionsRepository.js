import UserPermissions from '../models/UserPermissions.js'

const UserPermissionsRepository = {
  async updatePermission (userId, fieldName, isVisible) {
    await UserPermissions.upsert({ user_id: userId, field_name: fieldName, is_visible: isVisible })
  },

  async getUserPermissions (userId) {
    return await UserPermissions.findAll({
      where: { user_id: userId },
      attributes: ['field_name', 'is_visible']
    })
  }
}

export default UserPermissionsRepository
