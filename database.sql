-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: chat_room
-- ------------------------------------------------------
-- Server version   5.7.20

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL,
  `phone` varchar(30) NOT NULL DEFAULT '', 
  `wechat` varchar(60) NOT NULL DEFAULT '', 
  `last_login` int(11) NOT NULL DEFAULT '0' COMMENT '最后一次登录时间',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'123456','1234567','','',0),(2,'1234567','1234567','','',0),(3,'admin','14c6a502627f30fda78a2c72a93bda44','','',0),(4,'admintfhtf','d48afc01514c03afe0d01087977ae8ab','','',0),(5,'admintfhtfsd','c7c4a638e3feb669813ef518c9db190f','','',0),(6,'今天天气','c7c4a638e3feb669813ef518c9db190f','','',0),(7,'今天天气很好','c7c4a638e3feb669813ef518c9db190f','','',0),(8,'今天天气很好的','c7c4a638e3feb669813ef518c9db190f','','',0),(9,'今天天气很好的哦','c7c4a638e3feb669813ef518c9db190f','','',0),(10,'滨江录','c7c4a638e3feb669813ef518c9db190f','','',0),(11,'世界很大','c7c4a638e3feb669813ef518c9db190f','','',0),(12,'这个很精彩','c7c4a638e3feb669813ef518c9db190f','','',0),(13,'admin;fdlmge','54076fda9bed878c2f8e408aa7b5b864','','',0),(14,'lester','14c6a502627f30fda78a2c72a93bda44','','',0),(15,'我喜欢你的笑','7b897a6678e96adaa3022b2f43aea671','','',0),(16,'aye','ab0de043e0ca66219463e56a21cbd2e1','','',0),(17,'dandan','3ef16737d78264bf58cbb48abf8bd0e5','','',0),(18,'a123456','14c6a502627f30fda78a2c72a93bda44','','',0),(19,'dan','a0efe505cf6d3c0535de5c6699490273','','',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-02  3:46:45
