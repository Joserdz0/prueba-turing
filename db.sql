-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para prueba_turing
DROP DATABASE IF EXISTS `prueba_turing`;
CREATE DATABASE IF NOT EXISTS `prueba_turing` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `prueba_turing`;

-- Volcando estructura para tabla prueba_turing.pets
DROP TABLE IF EXISTS `pets`;
CREATE TABLE IF NOT EXISTS `pets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `breed` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `vaccinated` tinyint(1) DEFAULT 0,
  `neutered` tinyint(1) DEFAULT 0,
  `img` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla prueba_turing.pets: ~0 rows (aproximadamente)
DELETE FROM `pets`;
INSERT INTO `pets` (`id`, `name`, `age`, `type`, `breed`, `user_id`, `description`, `vaccinated`, `neutered`, `img`, `createdAt`, `updatedAt`, `status`) VALUES
	(1, 'Griso', 3, 'Dog', 'Golden Retriever', NULL, 'A friendly and playful dog.', 1, 0, 'https://www.purina.es/sites/default/files/2021-02/CAT%20HERO_0019_Ragdoll.jpg', '2025-01-04 17:23:07', '2025-01-04 17:54:22', 0),
	(2, 'Buddy', 3, 'Dog', 'Golden Retriever', 2, 'A friendly and playful dog.', 1, 0, NULL, '2025-01-04 17:46:59', '2025-01-04 17:46:59', 1),
	(3, 'Buddy', 3, 'Dog', 'Golden Retriever', 2, 'A friendly and playful dog.', 1, 0, NULL, '2025-01-04 17:50:21', '2025-01-04 17:50:21', 1),
	(4, 'Buddy', 3, 'Dog', 'Golden Retriever', 2, 'A friendly and playful dog.', 1, 0, 'https://www.purina.es/sites/default/files/2021-02/CAT%20HERO_0019_Ragdoll.jpg', '2025-01-04 17:51:33', '2025-01-04 17:51:33', 1);

-- Volcando estructura para tabla prueba_turing.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `uc_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla prueba_turing.users: ~1 rows (aproximadamente)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`, `status`) VALUES
	(2, 'jose', 'usuario@example.com', '$2a$10$NmhrLc7Jt9Z/z0z24oPNsef20SeMCKTEGGnnX4wOLrFRhojOiUMCq', '2025-01-04 16:47:45', '2025-01-04 17:09:53', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
