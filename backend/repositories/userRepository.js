import User from '../models/User.js'
import bcrypt from 'bcrypt'
import UserPermission from '../models/UserPermissions.js'

export class UserRepository {
  // eslint-disable-next-line camelcase
  static async create ({ nombre, email, password, cedula, telefono, direccion, fecha_nacimiento, genero, ocupacion }) {
    // Validaciones
    Validations.nombre(nombre)
    Validations.email(email)
    Validations.password(password)
    Validations.cedula(cedula)
    Validations.telefono(telefono)
    Validations.direccion(direccion)
    Validations.fecha_nacimiento(fecha_nacimiento)
    Validations.genero(genero)
    Validations.ocupacion(ocupacion)

    // Verificar si el usuario ya existe
    let user = await User.findOne({ where: { email } })
    if (user) throw new Error('El correo electrónico ya está registrado en el sistema')

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear usuario en PostgreSQL
    user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      cedula,
      telefono,
      direccion,
      // eslint-disable-next-line camelcase
      fecha_nacimiento,
      genero,
      ocupacion
    })

    return user.id
  }

  static async findById (id) {
    try {
      const user = await User.findOne({ where: { id } }) // Busca al usuario por ID
      if (!user) throw new Error('Usuario no encontrado')
      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async login ({ email, password }) {
    // Validaciones
    Validations.email(email)
    Validations.password(password)

    // Buscar usuario
    const user = await User.findOne({ where: { email } })
    if (!user) throw new Error('Usuario no encontrado')

    // Validar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) throw new Error('Contraseña incorrecta')

    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    }
  }

  static async updatePermisions (userId, fieldName, isVisible) {
    await UserPermission.upsert({
      user_id: userId,
      field_name: fieldName,
      is_visible: isVisible
    })
  }

  static async getUserPermissions (userId) {
    const permissions = await UserPermission.findAll({
      where: { user_id: userId },
      attributes: ['field_name', 'is_visible'],
      raw: true
    })
    // eslint-disable-next-line camelcase
    return permissions.reduce((acc, { field_name, is_visible }) => {
      // eslint-disable-next-line camelcase
      acc[field_name] = is_visible
      return acc
    }, {})
  }

  static async getPublicUsers () {
    try {
      const users = await User.findAll({
        include: [{
          model: UserPermission,
          as: 'permissions',
          attributes: ['field_name', 'is_visible']
        }]
      })

      return users.map(user => {
        const permissions = user.permissions.reduce((acc, perm) => {
          acc[perm.field_name] = perm.is_visible
          return acc
        }, {})

        return {
          id: user.id,
          nombre: permissions.nombre ? user.nombre : 'Anonimizado',
          email: permissions.email ? user.email : 'anonimizado@email.com',
          cedula: permissions.cedula ? user.cedula : 'XXXXXXXXXX',
          telefono: permissions.telefono ? user.telefono : '0000000000',
          direccion: permissions.direccion ? user.direccion : 'Dirección Oculta',
          fecha_nacimiento: permissions.fecha_nacimiento ? user.fecha_nacimiento : null,
          rol: permissions.rol ? user.rol : 'No Disponible'
        }
      })
    } catch (error) {
      throw new Error(`Error obteniendo usuarios públicos: ${error.message}`)
    }
  }

  static async updateProfile (userId, updateData) {
    // Campos permitidos para actualización
    const allowedFields = [
      'nombre',
      'email',
      'password',
      'cedula',
      'telefono',
      'direccion',
      'fecha_nacimiento',
      'genero',
      'ocupacion'
    ]
    const filteredData = Object.keys(updateData)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key]
        return obj
      }, {})
    // Validaciones
    if (filteredData.nombre) Validations.nombre(filteredData.nombre)
    if (filteredData.email) {
      Validations.email(filteredData.email)
      const existingUser = await User.findOne({ where: { email: filteredData.email } })
      if (existingUser && existingUser.id !== userId) {
        throw new Error('El correo electrónico ya está registrado en el sistema')
      }
    }
    if (filteredData.password) Validations.password(filteredData.password)
    if (filteredData.cedula) Validations.cedula(filteredData.cedula)
    if (filteredData.telefono) Validations.telefono(filteredData.telefono)
    if (filteredData.direccion) Validations.direccion(filteredData.direccion)
    if (filteredData.fecha_nacimiento) Validations.fecha_nacimiento(filteredData.fecha_nacimiento)
    if (filteredData.genero) Validations.genero(filteredData.genero)
    if (filteredData.ocupacion) Validations.ocupacion(filteredData.ocupacion)

    if (filteredData.password) {
      filteredData.password = await bcrypt.hash(filteredData.password, 10)
    }

    // Actualizar el usuario
    const [updatedRows] = await User.update(filteredData, {
      where: { id: userId },
      returning: true, // Para devolver el usuario actualizado
      individualHooks: true // Para ejecutar hooks (como beforeUpdate)
    })

    if (updatedRows === 0) {
      throw new Error('No se pudo actualizar el usuario')
    }

    // Devolver el usuario actualizado (sin la contraseña)
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    })

    return updatedUser
  }
}

class Validations {
  static nombre (nombre) {
    if (typeof nombre !== 'string') throw new Error('El nombre debe ser una cadena de texto')
    if (nombre.length < 3) throw new Error('El nombre debe tener al menos 3 caracteres')
  }

  static email (email) {
    if (typeof email !== 'string') throw new Error('El correo electrónico debe ser una cadena de texto, valor actual: ' + typeof (email))
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('El correo electrónico no es válido')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('La contraseña debe ser una cadena de texto')
    if (password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres')
  }

  static cedula (cedula) {
    if (typeof cedula !== 'string') throw new Error('La cédula debe ser una cadena de texto')
    if (cedula.length !== 10) throw new Error('La cédula debe tener 10 caracteres')
  }

  static telefono (telefono) {
    if (typeof telefono !== 'string') throw new Error('El teléfono debe ser una cadena de texto')
    if (telefono.length !== 10) throw new Error('El teléfono debe tener 10 caracteres')
  }

  static direccion (direccion) {
    if (typeof direccion !== 'string') throw new Error('La dirección debe ser una cadena de texto')
    if (direccion.length < 5) throw new Error('La dirección debe tener al menos 5 caracteres')
  }

  // eslint-disable-next-line space-before-function-paren
  // eslint-disable-next-line camelcase
  static fecha_nacimiento (fecha_nacimiento) {
    const date = new Date(fecha_nacimiento)
    // eslint-disable-next-line camelcase
    if (!(date instanceof Date) || isNaN(date)) {
      // eslint-disable-next-line camelcase
      throw new Error('La fecha de nacimiento debe ser una fecha válida' + fecha_nacimiento)
    }
  }

  static genero (genero) {
    if (typeof genero !== 'string') throw new Error('El género debe ser una cadena de texto')
    if (!['masculino', 'femenino', 'otro'].includes(genero)) throw new Error('El género debe ser masculino, femenino u otro')
  }

  static ocupacion (ocupacion) {
    if (typeof ocupacion !== 'string') throw new Error('La ocupación debe ser una cadena de texto')
    if (ocupacion.length < 3) throw new Error('La ocupación debe tener al menos 3 caracteres')
  }
}
