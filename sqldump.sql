CREATE DATABASE  IF NOT EXISTS `jobboard` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `jobboard`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: jobboard
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applied_to`
--

DROP TABLE IF EXISTS `applied_to`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applied_to` (
  `company_name` varchar(255) NOT NULL,
  `job_seeker_email` varchar(45) NOT NULL,
  `job_post_id` int NOT NULL,
  `application_portal` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`company_name`,`job_seeker_email`,`job_post_id`),
  KEY `job_post_id_idx` (`job_post_id`),
  KEY `job_seeker_id_idx` (`email`),
  CONSTRAINT `company_name` FOREIGN KEY (`company_name`) REFERENCES `company` (`name`),
  CONSTRAINT `job_post_id` FOREIGN KEY (`job_post_id`) REFERENCES `job_posting` (`job_id`),
  CONSTRAINT `job_seeker_id` FOREIGN KEY (`email`) REFERENCES `users` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `available_jobs`
--

DROP TABLE IF EXISTS `available_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `available_jobs` (
  `available_job` int NOT NULL,
  `job_poster_email` varchar(45) NOT NULL,
  PRIMARY KEY (`job_poster_email`),
  KEY `job_poster_email_idx` (`job_poster_email`),
  KEY `available_job_idx` (`available_job`),
  CONSTRAINT `available_job` FOREIGN KEY (`available_job`) REFERENCES `job_posting` (`job_id`),
  CONSTRAINT `job_poster_email` FOREIGN KEY (`job_poster_email`) REFERENCES `users` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `flag`
--

DROP TABLE IF EXISTS `flag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flag` (
  `job_id` int NOT NULL,
  `account_id` int NOT NULL,
  PRIMARY KEY (`job_id`,`account_id`),
  KEY `account_idf_idx` (`account_id`),
  CONSTRAINT `account_idf` FOREIGN KEY (`account_id`) REFERENCES `users` (`account_id`),
  CONSTRAINT `job_idf` FOREIGN KEY (`job_id`) REFERENCES `job_posting` (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `job_id` int NOT NULL,
  `company_name` varchar(255) NOT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_posting`
--

DROP TABLE IF EXISTS `job_posting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_posting` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `flag` varchar(255) DEFAULT NULL,
  `qualification` text NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `disclaimer` text,
  `compensation` int DEFAULT NULL,
  `application_deadline` date NOT NULL,
  `account_id` int NOT NULL,
  `description` text,
  `company` varchar(255) NOT NULL,
  PRIMARY KEY (`job_id`),
  KEY `account_id_idx` (`account_id`),
  KEY `company_idx` (`company`),
  CONSTRAINT `account_id1` FOREIGN KEY (`account_id`) REFERENCES `users` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `company` FOREIGN KEY (`company`) REFERENCES `users` (`affiliated_company`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `resume`
--

DROP TABLE IF EXISTS `resume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume` (
  `account_id` int NOT NULL,
  `job_seeker_email` varchar(255) NOT NULL,
  `contact_information` varchar(45) NOT NULL,
  `education` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `interests` varchar(45) DEFAULT NULL,
  `additional_information` varchar(45) DEFAULT NULL,
  `work_experience` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `job_seeker_email_UNIQUE` (`job_seeker_email`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`),
  CONSTRAINT `acc_id` FOREIGN KEY (`account_id`) REFERENCES `users` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(64) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `other_contact_info` varchar(45) DEFAULT NULL,
  `about` varchar(45) DEFAULT NULL,
  `affiliated_company` varchar(45) DEFAULT NULL,
  `verified` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`account_id`,`email`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`),
  KEY `account_id_idx` (`account_id`),
  KEY `affiliated_company_idx` (`affiliated_company`),
  CONSTRAINT `affiliated_company` FOREIGN KEY (`affiliated_company`) REFERENCES `company` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-12 22:54:32
