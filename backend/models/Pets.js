// models/Pets.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Pets = sequelize.define('pets', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  breed: {
    type: DataTypes.STRING(255)
  },
  user_id: {
    type: DataTypes.INTEGER,

  },
  description: {
    type: DataTypes.TEXT
  },
  vaccinated: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0
  },
  neutered: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0
  },
  img: {
    type: DataTypes.STRING(255)
  },
  status: {
    type: DataTypes.TINYINT(1),
    defaultValue: 1
  }
}, {
  tableName: 'pets', // Nombre de la tabla
  timestamps: true, // Activar timestamps para manejar `createdAt` y `updatedAt`
  indexes: [
    {
      fields: ['user_id'] // Índice para el campo user_id
    }
  ]
});


// No olvides exportar el modelo
export default Pets;
