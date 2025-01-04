// models/Users.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.TINYINT(1),
    defaultValue: 1
  }
}, {
  tableName: 'users', // Nombre de la tabla
  timestamps: true, // Activar timestamps para manejar `createdAt` y `updatedAt`
  indexes: [
    {
      unique: true,
      fields: ['email'] // Índice único para el campo email
    }
  ]
});

// No olvides exportar el modelo
export default Users;
