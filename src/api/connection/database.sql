-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: 5709project
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coupon`
--

DROP TABLE IF EXISTS `coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `coupon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon code` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rate` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idcoupon_UNIQUE` (`id`),
  UNIQUE KEY `coupon code_UNIQUE` (`coupon code`),
  UNIQUE KEY `PID_UNIQUE` (`PID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon`
--

LOCK TABLES `coupon` WRITE;
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
INSERT INTO `coupon` VALUES (1,'KTDABC','0.95',2),(2,'ABCDTD','0.98',1),(3,'KCKSVG','0.80',5);
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `evaluation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PID` int(11) NOT NULL,
  `comments` varchar(9999) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ratings` int(11) DEFAULT NULL,
  `UID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation`
--

LOCK TABLES `evaluation` WRITE;
/*!40000 ALTER TABLE `evaluation` DISABLE KEYS */;
INSERT INTO `evaluation` VALUES (3,1,'Very good food (I got the German breakfast), fantastic coffee and the service was friendly. \n\nThe prices however are on the steeper side but since everything is supposed to be fresh and it’s on the waterfront I guess that it was is expected, but for me that is enough to not visit again. \n\nIf someone else was paying however, I would certainly return.',5,2),(4,1,'I dont like it QAQ',3,3),(5,2,'I got the chicken club sandwich, fries & a glass of their lemonade. The sandwich and lemonade were pretty good but what really stood out to me were the fries, they had a great seasoning on them! Friendly staff as well :)',4,2),(6,2,'I love this place !! It\'s tucked away on a side street downtown Halifax off spring garden. Very intimate place, with a great drink menu. One of the best burgers I have had in the city. The service was great and the food was amazing. I have been back and will continue to go back! Love it',5,3),(7,3,'Honestly I\'ve been here a dozen times--- one of the best restaurants in the city.  They Reliably serve cuts of exceptional meat that are, without a doubt, juicy and flavorful.   10/10. Every. Damn. Time.',4,1),(9,1,'Excellent. Menu choices easily and tastely accommodated both vegetarians and meat eaters alike. Portions are generous which is not common in many dining establishments. Everyone raved about the food they were served. Great service.',4,1),(10,11,'Awesome, recommend',4,3),(11,12,'Just fine',3,1),(13,14,'Average',3,3),(14,6,'Good taste',4,1),(15,9,'Great',5,3),(16,9,'I love it',5,1),(33,9,'I like Indian Chicken',4,2),(36,13,'Sushi Combo is nice',4,2),(37,9,'',4,2);
/*!40000 ALTER TABLE `evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geo`
--

DROP TABLE IF EXISTS `geo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `geo` (
  `geoID` int(11) NOT NULL AUTO_INCREMENT,
  `latittude` decimal(10,8) NOT NULL,
  `longitude` decimal(10,8) NOT NULL,
  PRIMARY KEY (`geoID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geo`
--

LOCK TABLES `geo` WRITE;
/*!40000 ALTER TABLE `geo` DISABLE KEYS */;
INSERT INTO `geo` VALUES (1,44.65929700,-63.60360500),(2,44.64518700,-63.57204400),(3,44.65900000,-63.63400000),(4,44.65745300,-63.67001900),(5,44.64303500,-63.57853700),(6,44.63784500,-63.58407700);
/*!40000 ALTER TABLE `geo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UID` int(11) NOT NULL,
  `PID` int(11) NOT NULL,
  `TID` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (4,2,9,1,'2018-01-09 10:44:00',2),(5,3,10,1,'2018-01-09 10:44:00',3),(6,1,11,2,'2018-01-09 10:44:00',2),(7,1,12,3,'2018-01-09 10:44:00',1),(8,2,13,2,'2018-01-09 10:44:00',3),(9,3,14,1,'2018-01-09 10:44:00',4),(10,2,6,2,'2018-01-09 10:44:00',2),(11,1,9,2,'2018-01-09 10:44:00',2),(12,2,11,2,'2018-01-09 10:44:00',3),(13,1,13,1,'2018-01-09 10:44:00',2),(14,2,11,16,'2019-04-03 16:13:05',4),(15,2,4,16,'2019-04-03 16:13:05',2),(16,2,4,16,'2019-04-03 16:13:05',1),(17,2,9,16,'2019-04-03 16:13:05',10),(18,2,11,17,'2019-04-03 16:14:22',4),(19,2,4,17,'2019-04-03 16:14:22',2),(20,2,4,17,'2019-04-03 16:14:22',1),(21,2,9,17,'2019-04-03 16:14:22',10),(22,2,11,18,'2019-04-03 16:14:36',4),(23,2,4,18,'2019-04-03 16:14:36',2),(24,2,4,18,'2019-04-03 16:14:36',1),(25,2,9,18,'2019-04-03 16:14:36',10),(26,2,11,19,'2019-04-03 18:48:19',3),(27,2,4,19,'2019-04-03 18:48:19',3),(28,2,9,20,'2019-04-03 18:55:31',6),(29,1,11,21,'2019-04-03 19:00:19',4);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pictureRef` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `RID` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`PID`),
  UNIQUE KEY `PID_UNIQUE` (`PID`),
  FULLTEXT KEY `name` (`name`,`description`,`category`),
  FULLTEXT KEY `name_2` (`name`,`description`,`category`),
  FULLTEXT KEY `name_3` (`name`,`description`,`category`),
  FULLTEXT KEY `name_4` (`name`,`description`,`category`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Nian gao','Nian gao includes many varieties, all made from glutinous rice that is pounded or ground into a paste and, depending on the variety, may simply be molded into shape or cooked again to settle the ingredient.','Chinese','niangao.jpeg',1,12.30),(2,'Sweet and Sour Pork Chops','A Chinese stir-fry dish made with juicy pieces of pork tenderloin, bell peppers, onion, and pineapple. Battered pork gets fried until crispy then tossed in a sweet and tangy sauce.','Chinese','sweetpork.jpg',3,20.99),(3,'Mushroom Pork','Bone-in or boneless pork chops in a rich mushroom sauce served with mashed potatoes is the ultimate dinner for a busy evening!','American','mushroompork.jpg',5,17.30),(4,'Bacon and Cheddar Angus','Enjoy our third-pound 100% Angus beef patty on a delicious sesame and poppy seed bun. Topped with savoury bacon, natural cheddar cheese, crisp red onions and pickles. Relish today!','American','baconcheddarburger.jpg',4,7.50),(5,'Flower Sushi','Celebrate Hina Matsuri on 3rd March with these cute flower shaped sushi rolls. Made using all natural ingredients, with some plum vinegar, nori seaweed, and seasoned sushi rice, these sushi rolls are a feast for the eyes as well as the tastebuds. Enjoy these as part of a main meal, or add to a bento lunchbox.','Japanese','flowersushi.jpg',2,22.30),(6,'Beef Noodle','Chinese beef noodle','Chinese','beefnoodle.jpg',1,9.50),(7,'Curry Chicken','Indian traditional curry chicken with rice','Indian','currychicken.jpg',6,10.00),(8,'Fried Rice','Chinese fried rice with egg','Chinese','friedrice.jpg',1,9.00),(9,'Indian Chicken','Indian traditional curry chicken with rice','Indian','indianchicken.jpg',7,10.50),(10,'Korean Noodle','Korean noodle with egg and carrot','Korean','koreannoodle.jpg',8,11.00),(11,'Pad Thai','Thailand noodle with egg and shrimp','Thailand','padthai.jpg',9,11.00),(12,'Spaghetti','Spaghett','American','spaghetti.jpg',5,10.00),(13,'Sushi Combo','Sushi Combo','Japanese','sushicombo.jpg',2,21.00),(14,'Vietnam Noodle','Vietnam noodle with beef','Vietnam','vietnamnoodle.jpg',10,9.50);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `restaurant` (
  `RID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(999) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(999) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(9999) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `restImg` varchar(999) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `geoID` int(11) NOT NULL,
  PRIMARY KEY (`RID`),
  UNIQUE KEY `RID_UNIQUE` (`RID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'Burger King','6049 Young St, Halifax, NS B3K 2A1','Fast food','burgerkingrussia.jpg',1),(2,'InSpring','5171 Salter St, Halifax, NS B3J 1E5','Chinese Hotpot','687818.png',2),(3,'KFC','18 Titus St, Halifax, NS B3M 2N4','Fast food','KFC.png',3),(4,'PizzaaHut','362 Lacewood Dr, Halifax, NS B3S 1M7','Fast food','pizzaHut.png',4),(5,'Subway','5675 Spring Garden Rd Suite 110B, Halifax, NS B3J 1G9','Fast food','subway.png',5),(6,'Tim Hortons','5980 University Ave, Halifax, NS B3K 6R8','Fast food','Tim.png',5);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transaction` (
  `TID` int(11) NOT NULL AUTO_INCREMENT,
  `UID` int(11) NOT NULL,
  `timestamp` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `totalCost` decimal(10,2) NOT NULL,
  `subtotoal` decimal(10,2) NOT NULL,
  `PIDs` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`TID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,3,'1552996874092',136.00,120.00,'1,2,3'),(2,5,'1552996874092',136.00,120.00,'1,2,3'),(3,5,'1552996874092',135.50,120.00,'1,2,3'),(4,1,'1552996874092',135.50,120.00,'1,2,3'),(5,1,'1552996874092',135.50,120.00,'1,2,3'),(6,2,'1554293800020',197.23,171.50,'11,4,4,9'),(7,2,'1554305617314',197.23,171.50,'11,4,4,9'),(8,2,'1554305879279',197.23,171.50,'11,4,4,9'),(9,2,'1554306920265',197.23,171.50,'undefined'),(10,2,'1554307035334',197.23,171.50,'11,4,4,9'),(11,2,'1554307076588',197.23,171.50,'11,4,4,9'),(12,2,'1554307675041',197.23,171.50,'11,4,4,9'),(13,2,'1554307720038',197.23,171.50,'11,4,4,9'),(14,2,'1554307757868',197.23,171.50,'11,4,4,9'),(15,2,'1554307950861',197.23,171.50,'11,4,4,9'),(16,2,'1554307985485',197.23,171.50,'11,4,4,9'),(17,2,'1554308062552',197.23,171.50,'11,4,4,9'),(18,2,'1554308076444',197.23,171.50,'11,4,4,9'),(19,2,'1554317298926',78.83,55.50,'11,4'),(20,2,'1554317731682',65.21,63.00,'9'),(21,1,'1554318019044',50.60,44.00,'11');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `UID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `birthdate` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `addressLine1` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `addressLine2` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `foodPreferences` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `selfieUCI` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `timestamp` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastTimePurchased` int(11) DEFAULT NULL,
  `postalcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'piggy','piggywolf@dal.ca','5848917979e356dd303b0d35ca49869f3122d859','1993-12-26','','','','Halifax','NS','','1552745309700',1,NULL,NULL),(2,'wolf','lz739367@dal.ca','5848917979e356dd303b0d35ca49869f3122d859','1996-12-26','Apt-1011,  5145 Victoria Road','','','Halifax','Nova Scotia','','1552745309700',0,'4K5','9022298085'),(3,'sean','piggywolfsean@dal.ca','5848917979e356dd303b0d35ca49869f3122d859','1993-12-26','','','','Halifax','NS','','1552745591728',1,NULL,NULL),(4,'song','song.zhao@dal.ca','7218ced2519f50e05d86b17bac47eddd92f825ba',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UID` int(11) NOT NULL,
  `balance` decimal(10,5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
INSERT INTO `wallet` VALUES (1,2,264.29500),(2,1,50.40000),(3,3,1.00000);
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-03 20:32:09
