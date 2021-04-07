-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: qaforum
-- ------------------------------------------------------
-- Server version	5.7.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `ans_id` int(11) NOT NULL AUTO_INCREMENT,
  `ques_id` int(11) DEFAULT NULL,
  `ans_body` varchar(16384) DEFAULT NULL,
  `rank` int(11) DEFAULT '0',
  `comment_count` int(11) DEFAULT '0',
  `is_anon` tinyint(1) DEFAULT '0',
  `ans_date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ans_id`),
  UNIQUE KEY `UID` (`UID`,`ques_id`),
  KEY `ques_id` (`ques_id`),
  CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`ques_id`) REFERENCES `question` (`ques_id`),
  CONSTRAINT `answer_ibfk_3` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (1,1,'Mujtaba likes cats the most !',0,0,0,'2020-12-03 07:51:23',10),(2,1,'Soumya likes cats the most !',0,0,0,'2020-12-03 08:00:20',12),(3,5,'Rohit likes water',0,0,0,'2020-12-03 15:02:48',10),(4,8,'Bob likes potat',0,0,0,'2020-12-09 11:38:34',10),(5,9,'Moo',0,0,0,'2020-12-09 11:51:20',10),(6,2,'Testing and debugging',0,0,0,'2020-12-09 11:58:35',10);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger ans_before_delete
before delete on answer
for each row
begin
 delete from upvote where upvote.ans_id = old.ans_id;
 end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `ans_id` int(11) DEFAULT NULL,
  `comment_body` varchar(2048) DEFAULT NULL,
  `comment_date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UID` int(11) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `ans_id` (`ans_id`),
  KEY `UID` (`UID`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`ans_id`) REFERENCES `answer` (`ans_id`),
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `ques_id` int(11) NOT NULL AUTO_INCREMENT,
  `ques_body` varchar(1024) NOT NULL,
  `is_anon` tinyint(1) DEFAULT '0',
  `ques_date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ques_id`),
  KEY `UID` (`UID`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'Who likes cats the most in PICT ?',0,'2020-12-01 15:41:40',10),(2,'Who likes cheese ?',0,'2020-12-01 16:52:34',3),(3,'Who likes water ?',0,'2020-12-01 23:09:55',10),(4,'Who likes water ?',0,'2020-12-01 23:19:26',10),(5,'Who likes water ?',0,'2020-12-01 23:32:14',10),(6,'Who likes candy ?',0,'2020-12-02 00:34:42',10),(7,'Who likes Potato ?',0,'2020-12-02 00:35:02',10),(8,'Who likes Potato ?',0,'2020-12-02 00:35:33',10),(9,'What does the fox say ?',0,'2020-12-09 11:49:59',10);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger ques_before_delete
before delete on question
for each row
 begin
delete from answer where answer.ques_id = old.ques_id;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `upvote`
--

DROP TABLE IF EXISTS `upvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `upvote` (
  `is_neg` tinyint(1) NOT NULL,
  `ans_id` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  PRIMARY KEY (`ans_id`,`UID`),
  KEY `UID` (`UID`),
  CONSTRAINT `upvote_ibfk_2` FOREIGN KEY (`ans_id`) REFERENCES `answer` (`ans_id`),
  CONSTRAINT `upvote_ibfk_3` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upvote`
--

LOCK TABLES `upvote` WRITE;
/*!40000 ALTER TABLE `upvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `upvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `UID` int(64) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `user_fname` varchar(30) NOT NULL,
  `user_lname` varchar(30) NOT NULL,
  `user_email` varchar(128) NOT NULL,
  `user_password` varchar(256) NOT NULL,
  `user_work_area` varchar(256) DEFAULT NULL,
  `user_knows_about` varchar(256) DEFAULT NULL,
  `user_date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gravatar_url` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'muj1','syed','mujtaba','foo@bar.com','admin','','','2020-11-24 17:29:22','https://gravatar.com/avatar'),(3,'ashley','Soumya','Malgonde','soumyamalgonde2001@gmail.com','hashedpassedstring','im ftdr','cp cpp dogs','2020-11-24 19:42:31','https://gravatar.com/avatar'),(4,'Rohit','Rohit','Thakare','rohit@foo.com','admin','Web','CS React NodeJS MongoDB','2020-11-24 19:47:04','https://gravatar.com/avatar'),(5,'davelx','Dave','101','foo2@bar.com','$2a$10$qD3pffQUJ4915ytU0CXc7unwgBrpQqrIDuYqmITtk.hlLZvo74a0m','Web','CS React NodeJS MongoDB','2020-11-25 16:25:01','https://gravatar.com/avatar'),(7,'testSQLInjection','Dave','101','foo3@bar.com','$2a$10$pkIeTq73KuXpXUyp.bT1H.OWF8xZIXO6zSe0FEJ3WDT/jf.fMU/.6','Web','','2020-11-25 16:38:47','https://gravatar.com/avatar'),(8,'lol1','','','lol3','$2a$10$hiTURSO3Dvv3o9KvE.gVNeSn7LtinGOuYwzk0uvRg6dKmA5K0MAx.','','','2020-11-30 20:52:47',''),(9,'lol23','','','lol32','$2a$10$jxR8MqlSm4C6W5B.1ZRdYexQ1zbIVaye39R6yoWp3jr3L3.Hd.pLe','','','2020-12-01 04:48:25',''),(10,'newUser','','','BigCheese','$2a$10$VZJBX9R3tx7awc2XjsrDCe7FWOYcCIz1PhzN9axM9/29xehB4GrAm','','cp;cpp;dogs','2020-12-01 09:20:11','https://www.gravatar.com/avatar/5545f0a89a7e05b6aa81e5fbcbd8e96b?s=100&d=https%3A%2F%2Fcf.quizizz.com%2Fjoin%2Fimg%2Favatars%2Ftablet_lg%2Fmonster24.png'),(11,'cade','','','cade@foo.com','$2a$10$cDcMl9iYZOv21XdS2ssCFu6.mpBdsQ7PNILrFSnYPpdr57NicdTZ2','','','2020-12-01 18:05:02','https://www.gravatar.com/avatar/bf062a7912054212285c3e188acc9bb8?s=100&d=https%3A%2F%2Fcf.quizizz.com%2Fjoin%2Fimg%2Favatars%2Ftablet_lg%2Fmonster24.png'),(12,'BigCheese','','','fooo@bar.com','$2a$10$GboOjgUX7Ytag.yS3cuUCue6I9FgJ8gDzlmD/9NUKq6wo.za2qjzG','','','2020-12-03 13:29:32','https://www.gravatar.com/avatar/756de6db415e46ac4879b377b0acecc4?s=100&d=https%3A%2F%2Fcf.quizizz.com%2Fjoin%2Fimg%2Favatars%2Ftablet_lg%2Fmonster24.png'),(13,'mujtabax','syed','mujtaba','fooooo@baaaar.com','$2a$10$B2Rt7N/QfeC3QnmetNU1VuKWAgk5hN.flLqpzT7e3UjAwX9Mwm2Ja','','','2020-12-10 22:39:31','https://www.gravatar.com/avatar/1b541bb386dcce3fe2e4e5173fd1223f?s=100&d=https%3A%2F%2Favatars.dicebear.com%2Fapi%2Fbottts%2FVlBzgbaiCMRAjWwhTHctcuAxhxKQFDaFpLSjFbcXoEFfRsWxPLDnJObCsNVlgTeMaPEZQleQYhYzRyWJjPjzp.svg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-29  8:30:27
