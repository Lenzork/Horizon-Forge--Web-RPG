-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.4.22-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Exportiere Datenbank Struktur für antropa
CREATE DATABASE IF NOT EXISTS `antropa` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `antropa`;

-- Exportiere Struktur von Tabelle antropa.blacklisted_names
CREATE TABLE IF NOT EXISTS `blacklisted_names` (
  `id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(50) DEFAULT 'USERNAME',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='This is the list of blacklisted names. The server will get all of these Names once at start.';

-- Exportiere Daten aus Tabelle antropa.blacklisted_names: ~1 rows (ungefähr)
/*!40000 ALTER TABLE `blacklisted_names` DISABLE KEYS */;
INSERT INTO `blacklisted_names` (`id`, `name`) VALUES
	(0, 'penis');
/*!40000 ALTER TABLE `blacklisted_names` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle antropa.characters
CREATE TABLE IF NOT EXISTS `characters` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `code` varchar(100) NOT NULL DEFAULT '',
  `level` int(110) NOT NULL DEFAULT 1,
  `portrait` varchar(150) NOT NULL,
  `class` enum('Warrior','Wizard','Archer') NOT NULL,
  `attackpower` int(11) NOT NULL,
  `health` int(11) NOT NULL,
  `defense` int(11) NOT NULL,
  `pvpcr` int(11) NOT NULL DEFAULT 0,
  `title` int(11) DEFAULT -1,
  `money` int(100) NOT NULL DEFAULT 0,
  `equipped_head` int(11) NOT NULL DEFAULT -1,
  `equipped_chest` int(11) NOT NULL DEFAULT -1,
  `equipped_leg` int(11) NOT NULL DEFAULT -1,
  `equipped_hand` int(11) NOT NULL DEFAULT -1,
  `equipped_boot` int(11) NOT NULL DEFAULT -1,
  `equipped_weapon` int(11) NOT NULL DEFAULT -1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle antropa.characters: ~13 rows (ungefähr)
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` (`id`, `name`, `code`, `level`, `portrait`, `class`, `attackpower`, `health`, `defense`, `pvpcr`, `title`, `money`, `equipped_head`, `equipped_chest`, `equipped_leg`, `equipped_hand`, `equipped_boot`, `equipped_weapon`) VALUES
	(0, 'KingKill', 'TyrekHill', 50, '26.png', 'Warrior', 3000, 1000, 0, 3435, 0, 2500000, 0, -1, -1, -1, -1, -1),
	(1, 'PVPGodx', 'defaultPassword', 1, '23.png', 'Wizard', 100, 1000, 0, 2080, -1, 0, -1, -1, -1, -1, -1, -1),
	(2, 'Anual', '$2b$10$tTvifBDM/PeXBAq5Z4.50ujHDInecoRBOObGi2PGqW4e39J1UCBxC', 1, '23.png', 'Wizard', 100, 1000, 0, 0, -1, 6333, -1, -1, -1, -1, -1, -1),
	(3, 'KEKLL', '$2b$10$U1mfQzqJQVubjj2vDoSPCe8liD1.LJPRxknBQWbvYm2CVJEpIGShq', 1, '23.png', 'Wizard', 100, 1000, 0, 0, -1, 5, 2, -1, -1, -1, -1, -1),
	(4, 'OMEGALUL', '$2b$10$L/aOCI5qQfGS9yxLghzgt.9e18AF3rlcrWQyRYGNvNurCI7oQugsi', 1, '24.png', 'Warrior', 100, 1000, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1),
	(5, 'BASTARD', '$2b$10$OjfURY2bk6mGbfUTLcEr7eW/io41y7JcKGeLYP7H8rCi3PA/Z/glq', 1, '24.png', 'Warrior', 100, 1000, 0, 2075, -1, 235269680, 11, 12, 13, 14, 15, 16),
	(6, 'SpaceCowboy', '$2b$10$UR1PKUk00Qn0XU8kyVWKrOjg3JaKFUjt8pbfdShdN6jERlC/jEJ8G', 1, '24.png', 'Warrior', 100, 1000, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1),
	(7, 'Lenzork', '$2b$10$FnftBOJPAskSU/vTr6HF3uZlWQwxZLtWxTqVpuvrDLCSYGPthdrim', 50, '23.png', 'Wizard', 100, 1000, 0, 6700, 0, 500000, 11, 12, 13, 14, 15, 16),
	(8, 'PVPGodxx', '$2b$10$OvgscYk9p7KIFsbEXpqkIeEs9qZqOaKhiWPUZWWhwVTziQpWTQwi6', 1, '23.png', 'Wizard', 100, 1000, 0, 2400, -1, 0, -1, -1, 8, -1, -1, -1),
	(11, 'NoobGamerX', '$2b$10$.wZ/2.VhATjWhloa4sUoReRQA3ESwaRWgQlqw2BFt3meYf3iGMdEO', 1, '28.png', 'Archer', 100, 1000, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1),
	(12, 'AndWeCantStop', '$2b$10$LAeoKSQVW.0UC4DeKu8pluiM3n.tng7OENUXLs1WB6HyJ71NMBC9G', 1, '23.png', 'Wizard', 100, 1000, 0, 50, -1, 0, -1, -1, -1, -1, -1, -1);
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle antropa.characters_inventorys
CREATE TABLE IF NOT EXISTS `characters_inventorys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characterid` int(11) DEFAULT NULL,
  `itemid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle antropa.characters_inventorys: ~47 rows (ungefähr)
/*!40000 ALTER TABLE `characters_inventorys` DISABLE KEYS */;
INSERT INTO `characters_inventorys` (`id`, `characterid`, `itemid`) VALUES
	(1, 7, 0),
	(3, 7, 2),
	(4, 7, 3),
	(5, 7, 4),
	(6, 1, 5),
	(7, 7, 5),
	(8, 7, 6),
	(9, 7, 8),
	(10, 7, 9),
	(11, 7, 10),
	(12, 7, 7),
	(13, 8, 8),
	(14, 10, 5),
	(15, 10, 3),
	(16, 7, 4),
	(17, 7, 6),
	(18, 7, 6),
	(19, 7, 4),
	(20, 5, 10),
	(21, 7, 3),
	(22, 5, 11),
	(23, 5, 12),
	(24, 5, 13),
	(25, 5, 14),
	(26, 5, 15),
	(27, 5, 16),
	(28, 5, 17),
	(29, 5, 11),
	(30, 5, 14),
	(31, 5, 4),
	(32, 5, 13),
	(33, 5, 17),
	(34, 5, 15),
	(35, 5, 16),
	(36, 5, 16),
	(37, 5, 13),
	(38, 5, 14),
	(39, 5, 4),
	(40, 5, 6),
	(41, 5, 17),
	(42, 5, 5),
	(43, 7, 16),
	(44, 7, 11),
	(45, 7, 12),
	(46, 7, 13),
	(47, 7, 14),
	(48, 7, 15);
/*!40000 ALTER TABLE `characters_inventorys` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle antropa.characters_titles
CREATE TABLE IF NOT EXISTS `characters_titles` (
  `id` int(11) NOT NULL,
  `characterid` int(11) DEFAULT NULL,
  `titleid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle antropa.characters_titles: ~1 rows (ungefähr)
/*!40000 ALTER TABLE `characters_titles` DISABLE KEYS */;
INSERT INTO `characters_titles` (`id`, `characterid`, `titleid`) VALUES
	(0, 1, 0);
/*!40000 ALTER TABLE `characters_titles` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle antropa.inbox_messages
CREATE TABLE IF NOT EXISTS `inbox_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characterid` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle antropa.inbox_messages: ~103 rows (ungefähr)
/*!40000 ALTER TABLE `inbox_messages` DISABLE KEYS */;
INSERT INTO `inbox_messages` (`id`, `characterid`, `message`, `timestamp`) VALUES
	(8, 5, 'Bought <span style=\'color:#9d9d9d\'> Boots of the elite Knight</span> from the marketplace for <span style=\'color:yellow\'> 333333</span> Gold', '2022-02-26 22:03:11'),
	(9, 5, 'Bought <span style=\'color:#9d9d9d\'> Dagger of the Lifebinder</span> from the marketplace for <span style=\'color:yellow\'> 1948436</span> Gold', '2022-02-26 22:04:31'),
	(10, 5, 'Bought <span style=\'color:#ff8000\'> Dagger of the Lifebinder</span> from the marketplace for <span style=\'color:yellow\'> 3333333</span> Gold', '2022-02-26 22:06:17'),
	(11, 5, 'Bought <span style=\'color:#1eff00\'> Legs of the elite Knight</span> from the marketplace for <span style=\'color:yellow\'> 232323</span> Gold', '2022-02-26 22:07:05'),
	(12, 5, 'Bought <span style=\'color:#1eff00\'> Hands of the elite Knight</span> from the marketplace for <span style=\'color:yellow\'> 333333</span> Gold', '2022-02-26 22:07:45'),
	(13, 5, 'Bought <span style=\'color:#ffffff\'> Orange Dust</span> from the marketplace for <span style=\'color:yellow\'> 323222</span> Gold', '2022-02-26 22:07:46'),
	(14, 5, 'Bought <span style=\'color:#ffffff\'> Head of the Knight</span> from the marketplace for <span style=\'color:yellow\'> 433324</span> Gold', '2022-02-26 22:07:48'),
	(15, 5, 'Bought <span style=\'color:#ff8000\'> Nightblade</span> from the marketplace for <span style=\'color:yellow\'> 2147483647</span> Gold', '2022-02-26 22:13:09'),
	(16, 5, 'Bought <span style=\'color:#a335ee\'> Gladiator\'s Icy Book</span> from the marketplace for <span style=\'color:yellow\'> 55555</span> Gold', '2022-02-26 22:15:13'),
	(98, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span>CR', '2022-02-27 20:56:42'),
	(99, 7, 'Won against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:00:23'),
	(100, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:01:48'),
	(101, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:11:29'),
	(102, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:12:18'),
	(103, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:13:54'),
	(104, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:17:49'),
	(105, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:22:59'),
	(106, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:29:45'),
	(107, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:32:36'),
	(108, 7, 'Won against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:32:48'),
	(109, 7, 'Won against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:32:48'),
	(110, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:36:05'),
	(111, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:39:21'),
	(112, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:45:34'),
	(113, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:45:34'),
	(114, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:58:22'),
	(115, 7, 'Won against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 21:59:35'),
	(116, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:01:13'),
	(117, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:03:44'),
	(118, 7, 'Won against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:04:46'),
	(119, 7, 'Won against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:05:42'),
	(120, 7, 'Won against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:08:09'),
	(121, 7, 'Won against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:12:16'),
	(122, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:14:25'),
	(123, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:21:26'),
	(124, 7, 'Lost against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:21:26'),
	(125, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:22:57'),
	(126, 7, 'Lost against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:22:57'),
	(127, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:24:09'),
	(128, 7, 'Lost against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:24:09'),
	(129, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:26:05'),
	(130, 7, 'Lost against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:26:05'),
	(131, 7, 'Bought <span style=\'color:#1eff00\'> Head of the elite Knight</span> from the marketplace for <span style=\'color:yellow\'> 500000</span> Gold', '2022-02-27 22:28:30'),
	(132, 7, 'Bought <span style=\'color:#1eff00\'> Chest of the elite Knight</span> from the marketplace for <span style=\'color:yellow\'> 500000</span> Gold', '2022-02-27 22:28:31'),
	(133, 7, 'Bought <span style=\'color:#1eff00\'> Legs of the elite Knight</span> from the marketplace for <span style=\'color:yellow\'> 500000</span> Gold', '2022-02-27 22:28:33'),
	(134, 7, 'Bought <span style=\'color:#1eff00\'> Hands of the elite Knight</span> from the marketplace for <span style=\'color:yellow\'> 500000</span> Gold', '2022-02-27 22:28:35'),
	(135, 7, 'Bought <span style=\'color:#1eff00\'> Boots of the elite Knight</span> from the marketplace for <span style=\'color:yellow\'> 500000</span> Gold', '2022-02-27 22:28:37'),
	(136, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:30:27'),
	(137, 7, 'Lost against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:30:27'),
	(138, 7, 'Won against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:32:04'),
	(139, 5, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:32:04'),
	(140, 5, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:33:06'),
	(141, 11, 'Lost against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:33:06'),
	(142, 5, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:36:38'),
	(143, 11, 'Lost against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:36:38'),
	(144, 7, 'Won against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:37:15'),
	(145, 5, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:37:15'),
	(146, 12, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:41:16'),
	(147, 11, 'Lost against <span style=\'color: yellow;\'>AndWeCantStop</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:41:16'),
	(148, 11, 'Won against <span style=\'color: yellow;\'>AndWeCantStop</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:42:38'),
	(149, 12, 'Lost against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:42:38'),
	(150, 12, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:44:48'),
	(151, 11, 'Lost against <span style=\'color: yellow;\'>AndWeCantStop</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:44:48'),
	(152, 12, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:46:49'),
	(153, 11, 'Lost against <span style=\'color: yellow;\'>AndWeCantStop</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:46:49'),
	(154, 11, 'Won against <span style=\'color: yellow;\'>AndWeCantStop</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:48:28'),
	(155, 12, 'Lost against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:48:28'),
	(156, 12, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:50:00'),
	(157, 11, 'Lost against <span style=\'color: yellow;\'>AndWeCantStop</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:50:00'),
	(158, 12, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:55:47'),
	(159, 11, 'Lost against <span style=\'color: yellow;\'>AndWeCantStop</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:55:47'),
	(160, 7, 'Won against <span style=\'color: yellow;\'>AndWeCantStop</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:56:12'),
	(161, 12, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:56:12'),
	(162, 7, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 22:58:23'),
	(163, 11, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 22:58:23'),
	(164, 7, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:00:52'),
	(165, 11, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:00:52'),
	(166, 7, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:02:46'),
	(167, 11, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:02:46'),
	(168, 7, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:02:59'),
	(169, 11, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:02:59'),
	(170, 7, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:03:08'),
	(171, 11, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:03:08'),
	(172, 7, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:03:19'),
	(173, 11, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:03:19'),
	(174, 7, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:03:30'),
	(175, 11, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:03:30'),
	(176, 7, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:04:40'),
	(177, 11, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:04:40'),
	(178, 7, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:04:54'),
	(179, 11, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:04:54'),
	(180, 7, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:05:16'),
	(181, 11, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:05:16'),
	(182, 7, 'Won against <span style=\'color: yellow;\'>NoobGamerX</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:05:37'),
	(183, 11, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:05:37'),
	(184, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:06:11'),
	(185, 7, 'Lost against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:06:11'),
	(186, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:07:49'),
	(187, 7, 'Lost against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:07:49'),
	(188, 7, 'Won against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:10:03'),
	(189, 5, 'Lost against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:10:03'),
	(190, 5, 'Won against <span style=\'color: yellow;\'>Lenzork</span> in PVP Combat and gained <span style=\'color: green;\'>25</span> CR', '2022-02-27 23:12:34'),
	(191, 7, 'Lost against <span style=\'color: yellow;\'>BASTARD</span> in PVP Combat and lost <span style=\'color: red;\'>25</span> CR', '2022-02-27 23:12:34');
/*!40000 ALTER TABLE `inbox_messages` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle antropa.items
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(255) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `type` int(11) NOT NULL DEFAULT 6,
  `description` varchar(255) NOT NULL DEFAULT '0',
  `sellprice` int(11) NOT NULL DEFAULT 0,
  `buyprice` int(11) NOT NULL DEFAULT 0,
  `soulbound` tinyint(1) NOT NULL DEFAULT 1,
  `isWeapon` tinyint(1) NOT NULL DEFAULT 0,
  `bonus_damage` int(255) NOT NULL DEFAULT 0,
  `bonus_health` int(255) NOT NULL DEFAULT 0,
  `bonus_defense` int(255) NOT NULL DEFAULT 0,
  `requiredlevel` int(255) NOT NULL DEFAULT 0,
  `icon` varchar(255) DEFAULT NULL,
  `rarity` enum('Poor','Common','Uncommon','Rare','Epic','Legendary','Artifact') DEFAULT 'Poor',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='All items are stored in here';

-- Exportiere Daten aus Tabelle antropa.items: ~18 rows (ungefähr)
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` (`id`, `name`, `type`, `description`, `sellprice`, `buyprice`, `soulbound`, `isWeapon`, `bonus_damage`, `bonus_health`, `bonus_defense`, `requiredlevel`, `icon`, `rarity`) VALUES
	(0, 'Test Item', 6, 'The first ever created Item is an Test item!', 0, 0, 1, 1, 200, 0, 0, 2, '../images/icons/daggers/fire_dagger.png', 'Legendary'),
	(1, 'Another  Item', 6, 'Second ever created item', 0, 0, 1, 1, 300, 0, 0, 3, '../images/icons/daggers/daggers.png', 'Epic'),
	(2, 'Skull', 6, 'A simple Skull', 0, 0, 1, 0, 0, 0, 0, 0, '../images/icons/bonenskulls/2.png', 'Common'),
	(3, 'Skull of Farantis', 4, 'This is the Skull of Farantis. He is one of the fallen Kings from the Orotosch. You can see his Power even when he is dead.', 50000, -1, 1, 0, 0, 0, 0, 0, '../images/icons/bonenskulls/43.png', 'Artifact'),
	(4, 'Orange Dust', 6, 'Can be used to craft things', 25, 50, 0, 0, 0, 0, 0, 0, '../images/icons/alchemists/18.png', 'Common'),
	(5, 'Gladiator\'s Icy Book', 5, 'This Item is obtained by the highest PVP Players', 0, 0, 1, 1, 2800, 1000, 2, 60, '../images/icons/books/17.png', 'Epic'),
	(6, 'Head of the Knight', 0, 'This is an head crafted by the Blacksmith in the City', 3000, 5000, 1, 0, 0, 50, 5, 0, '../images/icons/armor/1.png', 'Common'),
	(7, 'Chest of the Knight', 1, 'This is an chest crafted by the Blacksmith in the City', 3000, 5000, 1, 0, 0, 50, 5, 0, '../images/icons/armor/3.png', 'Common'),
	(8, 'Legs of the Knight', 2, 'These are Legs crafted by the Blacksmith in the City', 3000, 5000, 1, 0, 0, 50, 5, 0, '../images/icons/armor/5.png', 'Common'),
	(9, 'Hands of the Knight', 3, 'These are Hands crafted by the Blacksmith in the City', 3000, 5000, 1, 0, 0, 50, 5, 0, '../images/icons/armor/7.png', 'Common'),
	(10, 'Boots of the Knight', 4, 'These are Boots crafted by the Blacksmith in the City', 3000, 5000, 1, 0, 0, 50, 5, 0, '../images/icons/armor/9.png', 'Common'),
	(11, 'Head of the elite Knight', 0, 'This is an head given to the elite Knights of the City', 10000, 15000, 1, 0, 0, 150, 15, 0, '../images/icons/armor/2.png', 'Uncommon'),
	(12, 'Chest of the elite Knight', 1, 'This is an chest given to the elite Knights of the City', 10000, 15000, 1, 0, 0, 150, 15, 0, '../images/icons/armor/4.png', 'Uncommon'),
	(13, 'Legs of the elite Knight', 2, 'These are Legs given to the elite Knights of the City', 10000, 15000, 1, 0, 0, 150, 15, 0, '../images/icons/armor/6.png', 'Uncommon'),
	(14, 'Hands of the elite Knight', 3, 'These are Hands given to the elite Knights of the City', 10000, 15000, 1, 0, 0, 150, 15, 0, '../images/icons/armor/8.png', 'Uncommon'),
	(15, 'Boots of the elite Knight', 4, 'These are Boots given to the elite Knights of the City', 10000, 15000, 1, 0, 0, 150, 15, 0, '../images/icons/armor/10.png', 'Uncommon'),
	(16, 'Dagger of the Lifebinder', 5, 'This is a dagger which was once created by the Lifebinder and gives the owner a lot of power. Nobody exactly knows how he was created.', 160000, -1, 1, 1, 4600, 2300, 5, 50, '../images/icons/daggers/lifebinder.png', 'Legendary'),
	(17, 'Nightblade', 5, '497427732061206d797374657279', 190000, -1, 1, 1, 7430, 1200, 0, 50, '../images/icons/daggers/nightblade.png', 'Legendary');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle antropa.itemtypes
CREATE TABLE IF NOT EXISTS `itemtypes` (
  `id` int(11) NOT NULL,
  `name` varchar(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle antropa.itemtypes: ~7 rows (ungefähr)
/*!40000 ALTER TABLE `itemtypes` DISABLE KEYS */;
INSERT INTO `itemtypes` (`id`, `name`) VALUES
	(0, 'Head'),
	(1, 'Chest'),
	(2, 'Leg'),
	(3, 'Hand'),
	(4, 'Boot'),
	(5, 'Weapon'),
	(6, 'Misc');
/*!40000 ALTER TABLE `itemtypes` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle antropa.marketplace_listings
CREATE TABLE IF NOT EXISTS `marketplace_listings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemid` int(11) NOT NULL,
  `buyoutprice` int(11) NOT NULL,
  `sellerid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle antropa.marketplace_listings: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `marketplace_listings` DISABLE KEYS */;
/*!40000 ALTER TABLE `marketplace_listings` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle antropa.pvpranks
CREATE TABLE IF NOT EXISTS `pvpranks` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `icon` varchar(50) NOT NULL DEFAULT '',
  `mincr` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle antropa.pvpranks: ~7 rows (ungefähr)
/*!40000 ALTER TABLE `pvpranks` DISABLE KEYS */;
INSERT INTO `pvpranks` (`id`, `name`, `icon`, `mincr`) VALUES
	(0, 'Rookie', '../images/ranks/Rank1_1.png', 0),
	(1, 'Pawn', '../images/ranks/Rank1_1.png', 700),
	(2, 'Compatriot', '../images/ranks/Rank2_1.png', 900),
	(3, 'Knight', '../images/ranks/Rank3_1.png', 1300),
	(4, 'Baron', '../images/ranks/Rank4_1.png', 1800),
	(5, 'King', '../images/ranks/Rank5_1.png', 2100),
	(6, 'Emperor', '../images/ranks/Rank6_1.png', 2400);
/*!40000 ALTER TABLE `pvpranks` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle antropa.titles
CREATE TABLE IF NOT EXISTS `titles` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle antropa.titles: ~1 rows (ungefähr)
/*!40000 ALTER TABLE `titles` DISABLE KEYS */;
INSERT INTO `titles` (`id`, `title`) VALUES
	(0, 'Gladiator of the tale,');
/*!40000 ALTER TABLE `titles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
