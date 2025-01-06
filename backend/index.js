import express from "express";
import sequelize from "./db.js";
import cors from "cors";
import mysql from "mysql2";
import bcrypt from "bcryptjs";

const app = express();
// Configuraciones
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

//tablas y relaciones
import Users from "./models/Users.js";
import Pets from "./models/Pets.js";

Pets.belongsTo(Users, { foreignKey: "user_id", targetKey: "id" });
Users.hasMany(Pets, { foreignKey: "user_id", sourceKey: "id" });

app.get("/", async (req, res) => {
  res.json({
    status: "success",
  });
});
// USERS
app.post("/users/create/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Faltan campos obligatorios",
      });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // '10' es el número de saltos que puede ajustarse según sea necesario

    // Crear el usuario con la contraseña cifrada
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      message: "Usuario creado",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Hubo un error al crear el usuario",
    });
  }
});
app.put("/users/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;

    // Verifica que el usuario exista
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    // Cifra la nueva contraseña si es proporcionada
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Actualiza el resto de los campos
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save(); // Guardar cambios en la base de datos

    res.json({
      status: "success",
      message: "Usuario actualizado",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Hubo un error al actualizar el usuario",
    });
  }
});
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica que el usuario exista
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    // Cambia el estado del usuario a 0 (desactivado)
    user.status = 0;
    await user.save();

    res.json({
      status: "success",
      message: "Usuario desactivado",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Hubo un error al desactivar el usuario",
    });
  }
});
app.post("/users/login/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Faltan campos obligatorios",
      });
    }

    // Buscar el usuario por su correo electrónico
    const user = await Users.findOne({ where: { email, status: 1 } });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    // Comparar la contraseña proporcionada con la almacenada (la cifra almacenada en la base de datos)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Contraseña incorrecta",
      });
    }

    // Respuesta exitosa
    res.json({
      status: "success",
      message: "Inicio de sesión exitoso",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Hubo un error al intentar iniciar sesión",
    });
  }
});
// PETS
app.post("/pets/create/", async (req, res) => {
  try {
    const {
      name,
      age,
      type,
      breed,
      user_id,
      description,
      vaccinated,
      neutered,
      img,
    } = req.body;

    if (!name || !age || !type || !breed || !user_id || !img) {
      return res.status(400).json({
        status: "error",
        message: "Faltan campos obligatorios",
      });
    }

    // Verificar si el propietario (user_id) existe
    const ownerExists = await Users.findOne({ where: { id: user_id } });
    if (!ownerExists) {
      return res.status(400).json({
        status: "error",
        message: "El propietario no existe",
      });
    }

    // Crear el pet
    const newPet = await Pets.create({
      name,
      age,
      type,
      breed,
      user_id,
      description,
      vaccinated,
      neutered,
      img,
    });

    res.json({
      status: "success",
      message: "Mascota creada",
      data: newPet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Hubo un error al crear la mascota",
    });
  }
});
app.put("/pets/:id", async (req, res) => {
  try {
    const { name, age, type, breed, description, vaccinated, neutered, img } =
      req.body;
    const { id } = req.params;

    // Verifica que la mascota exista
    const pet = await Pets.findByPk(id);
    if (!pet) {
      return res.status(404).json({
        status: "error",
        message: "Mascota no encontrada",
      });
    }

    // Actualiza los campos proporcionados
    if (name) pet.name = name;
    if (age) pet.age = age;
    if (type) pet.type = type;
    if (breed) pet.breed = breed;
    if (description) pet.description = description;
    if (vaccinated !== undefined) pet.vaccinated = vaccinated; // Asegurarse de manejar booleanos correctamente
    if (neutered !== undefined) pet.neutered = neutered; // Asegurarse de manejar booleanos correctamente
    if (img) pet.img = img;

    await pet.save(); // Guardar cambios en la base de datos

    res.json({
      status: "success",
      message: "Mascota actualizada",
      data: pet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Hubo un error al actualizar la mascota",
    });
  }
});
app.delete("/pets/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica que la mascota exista
    const pet = await Pets.findByPk(id);
    if (!pet) {
      return res.status(404).json({
        status: "error",
        message: "Mascota no encontrada",
      });
    }

    // Cambia el estado de la mascota a 0 (desactivada)
    pet.status = 0; // Si tienes un campo de estado en el modelo, puedes usarlo aquí.
    await pet.save();

    res.json({
      status: "success",
      message: "Mascota desactivada",
      data: pet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Hubo un error al desactivar la mascota",
    });
  }
});
app.get("/pets/", async (req, res) => {
  const result = {
    status: "",
    message: "",
    data: [],
  };

  const { user_id } = req.query; // Obtiene el parámetro opcional de la URL

  try {
    let whereCondition = {};

    if (user_id) {
      whereCondition.user_id = user_id;
    }
    whereCondition.status = 1;
    // Realiza la consulta para obtener el conteo de registros y la suma de time_in_app
    const data = await Pets.findAll({
      where: whereCondition,
    });
    result.status = "success";
    result.message = "Mascotas listadas correctamente";
    result.data = data;
  } catch (error) {
    result.status = "error";
    result.message = "Error al buscar las mascotas";
    result.data = [];
  }

  // Devolver el resultado en formato JSON
  res.json(result);
});
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
