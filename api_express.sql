-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mer. 07 déc. 2022 à 13:35
-- Version du serveur :  5.7.32
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `api_express`
--

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE `groupe` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `groupe`
--

INSERT INTO `groupe` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Python', '2022-12-05 14:55:03', '2022-12-05 14:55:03'),
(3, 'React', '2022-12-05 14:55:22', '2022-12-05 14:57:04'),
(4, 'Php', '2022-12-05 14:55:26', '2022-12-05 14:55:26'),
(5, 'React', '2022-12-07 07:46:53', '2022-12-07 07:46:53'),
(6, 'Javascript', '2022-12-07 07:50:35', '2022-12-07 07:50:35'),
(7, 'Symfony', '2022-12-07 07:59:41', '2022-12-07 07:59:41'),
(8, 'Laravel', '2022-12-07 08:00:08', '2022-12-07 08:00:08'),
(9, 'Angular', '2022-12-07 08:05:11', '2022-12-07 08:05:11'),
(10, 'Svelte', '2022-12-07 08:05:48', '2022-12-07 08:05:48'),
(12, 'Django', '2022-12-07 08:07:38', '2022-12-07 08:07:38'),
(14, 'NumPY', '2022-12-07 08:09:23', '2022-12-07 08:09:23'),
(15, 'Oauth2', '2022-12-07 08:11:45', '2022-12-07 08:11:45'),
(17, 'CSS', '2022-12-07 08:13:36', '2022-12-07 08:13:36'),
(18, 'Styled-Components', '2022-12-07 08:15:56', '2022-12-07 08:15:56'),
(21, 'Flask', '2022-12-07 08:28:33', '2022-12-07 08:39:44');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `roles` varchar(50) DEFAULT 'USER',
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `groupe_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `firstname`, `lastname`, `groupe_id`, `created_at`, `updated_at`) VALUES
(6, 'jeandoe@gmail.com', 'USER', '$2b$12$TgTJnNftuZpEmEooZi6DzO..xAtop4s9GVIu6P5D1D/Ha1uzpNN6m', 'Jean', 'Doe', NULL, '2022-12-05 14:13:19', '2022-12-07 08:38:46'),
(29, 'marceaudoe@gmail.com', 'USER', '$2b$12$3CvqYCT6yTHoTajBq7QmqusTWTooxRe3fX7o1mU/fvKHzUOr7E1f2', 'Marceau', 'Doe', 12, '2022-12-05 16:16:20', '2022-12-07 13:35:16'),
(30, 'Hectordoe@gmail.com', 'USER', '$2b$12$CowyEa/2PdQhyyeTfC6EBeIWk7D.xyhYbQzZEeIUwHQDi.p93Fg6W', 'Hector', 'Doe', 12, '2022-12-05 16:21:06', '2022-12-07 13:35:16'),
(31, 'pierredoe@gmail.com', 'USER', '$2b$12$A.YE27jPAud/PUe6F9Zi4ec/vDGvuxvDiOkBLxeBNVCgrIqT/8lQm', 'Pierre', 'Doe', 5, '2022-12-05 16:22:11', '2022-12-07 09:59:07'),
(32, 'mariusdoe@gmail.com', 'USER', '$2b$12$sv7hAZ8hGSJ2vDWTechk5OylF3LveXG97u0GVV01CEDrbvFQZPfZi', 'Marius', 'Doe', 12, '2022-12-06 09:25:16', '2022-12-07 09:49:49'),
(34, 'quentindoe@gmail.com', 'USER', '$2b$12$Qb3kSM8gmZjnvMlSJ24H8.6pDY9Zaih1mjxk4MVJT/vwYWTLmJ/e2', 'Quentin', 'Doe', 4, '2022-12-06 09:45:37', '2022-12-07 09:15:05'),
(35, 'jeffdoe@gmail.com', 'USER', '$2b$12$ndXEQNWH71ide5EgcuS0xuylKa3OQyb9Z2P4cyJP58nXV23x5XJzu', 'Jeff', 'Doe', 1, '2022-12-06 09:47:09', '2022-12-07 07:45:32'),
(39, 'alexdoe@gmail.com', 'USER', '$2b$12$fxvI5VNtPAlcn/kXi4Vy/uI5WFlWReDpgi2GTVOp/LHJPeZP6SiVm', 'Alex', 'Doe', 1, '2022-12-07 07:37:26', '2022-12-07 09:17:13'),
(40, 'gastondoe@gmail.com', 'USER', '$2b$12$rNQ5Zqg0HUgd7eeugWMtxucRRQ5AJiN77Fowu5zgR92RoCLoPGDoq', 'Gaston', 'Doe', 6, '2022-12-07 07:40:03', '2022-12-07 09:19:23'),
(42, 'admin@gmail.com', 'ADMIN', '$2b$12$2TEgeTgL8OlTFFJOGPqCgOO5FCiSa1zTTbQz/L8FZxR.1KKqDVEMS', 'Admin', 'Istrateur', NULL, '2022-12-07 08:52:05', '2022-12-07 09:52:15');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groupe_id` (`groupe_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`groupe_id`) REFERENCES `groupe` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
