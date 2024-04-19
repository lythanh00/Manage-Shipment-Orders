-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: supership
-- ------------------------------------------------------
-- Server version	8.0.13

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
-- Table structure for table `mileage`
--

DROP TABLE IF EXISTS `mileage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mileage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdby` varchar(255) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `kmdriven` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_mileage` (`userid`),
  CONSTRAINT `FK_user_mileage` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mileage`
--

LOCK TABLES `mileage` WRITE;
/*!40000 ALTER TABLE `mileage` DISABLE KEYS */;
/*!40000 ALTER TABLE `mileage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdby` varchar(255) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `productname` varchar(255) NOT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `totalitems` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `shipmentid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_shipmentid_Product` (`shipmentid`),
  CONSTRAINT `FK_shipmentid_Product` FOREIGN KEY (`shipmentid`) REFERENCES `shipment` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (7,NULL,'2023-10-30 21:52:39',NULL,'2023-10-30 21:52:39','Quần',1.00,3,300000.00,NULL),(8,NULL,'2023-10-30 21:52:46',NULL,'2023-10-30 21:52:46','Dép',1.00,3,300000.00,NULL),(9,NULL,'2023-12-17 10:36:40',NULL,'2023-12-17 10:36:40','áo',1.00,4,50000.00,NULL),(10,NULL,'2023-12-17 22:04:13',NULL,'2023-12-17 22:04:13','a',2.00,2,2.00,NULL),(11,NULL,'2023-12-17 22:07:58',NULL,'2023-12-17 22:07:58','b',1.00,1,1.00,53),(12,NULL,'2023-12-17 22:10:09',NULL,'2023-12-17 22:10:09','c',1.00,1,1.00,52),(13,NULL,'2023-12-17 22:33:37',NULL,'2023-12-18 21:34:31','ss',12.00,10,12.00,NULL),(14,NULL,'2023-12-24 11:57:04',NULL,'2023-12-24 11:57:04','giày nike',1.00,2,50000.00,61),(15,NULL,'2023-12-24 11:58:34',NULL,'2023-12-24 11:58:34','abc',1.00,3,15.00,61),(16,NULL,'2023-12-24 12:00:16',NULL,'2023-12-24 12:00:16','abc123',2.00,3,100.00,52),(17,NULL,'2023-12-24 12:00:32',NULL,'2023-12-24 12:00:32','123abc',2.00,3,100.00,61),(18,NULL,'2023-12-24 12:32:02',NULL,'2023-12-24 12:32:02','giày nike',1.00,1,240000.00,62),(19,NULL,'2023-12-31 15:06:48',NULL,'2023-12-31 15:06:48','giày',1.00,1,90000.00,63),(20,NULL,'2023-12-31 15:07:13',NULL,'2023-12-31 15:07:13','áo',1.00,1,20000.00,63),(21,NULL,'2024-04-19 22:49:08',NULL,'2024-04-19 22:49:08','áo ',1.00,3,250000.00,64),(22,NULL,'2024-04-19 22:49:53',NULL,'2024-04-19 22:49:53','quần',1.00,2,200000.00,64);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `shipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdby` varchar(255) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `totalitems` int(11) DEFAULT NULL,
  `paymentmethod` varchar(30) DEFAULT NULL,
  `totalmoney` decimal(10,2) DEFAULT NULL,
  `shipmentfee` decimal(10,2) DEFAULT NULL,
  `sendername` varchar(255) DEFAULT NULL,
  `senderaddress` text,
  `senderphonenumber` varchar(15) DEFAULT NULL,
  `receivername` varchar(255) DEFAULT NULL,
  `receiveraddress` text,
  `receiverphonenumber` varchar(15) DEFAULT NULL,
  `driveruserid` int(11) DEFAULT NULL,
  `description` text,
  `trackingnumber` varchar(20) DEFAULT NULL,
  `notes` text,
  `updatehistory` text,
  `workstore_code` varchar(255) DEFAULT NULL,
  `shipmentstatus_code` varchar(255) DEFAULT NULL,
  `estimatedeliverydistance` decimal(10,2) DEFAULT NULL,
  `actualdeliverydistance` decimal(10,2) DEFAULT NULL,
  `ispaidin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trackingnumber` (`trackingnumber`),
  KEY `FK_driveruser_shipment` (`driveruserid`),
  KEY `FK_shipment_shipmentstatus` (`shipmentstatus_code`),
  KEY `FK_shipment_workstore` (`workstore_code`),
  KEY `fk_created_by` (`createdby`),
  KEY `fk_modified_by` (`modifiedby`),
  CONSTRAINT `FK_driveruser_shipment` FOREIGN KEY (`driveruserid`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_shipment_shipmentstatus` FOREIGN KEY (`shipmentstatus_code`) REFERENCES `shipmentstatus` (`code`) ON DELETE SET NULL,
  CONSTRAINT `FK_shipment_workstore` FOREIGN KEY (`workstore_code`) REFERENCES `workstore` (`code`) ON DELETE SET NULL,
  CONSTRAINT `fk_created_by` FOREIGN KEY (`createdby`) REFERENCES `user` (`username`) ON DELETE SET NULL,
  CONSTRAINT `fk_modified_by` FOREIGN KEY (`modifiedby`) REFERENCES `user` (`username`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` VALUES (52,'khachhang01','2023-11-07 12:15:37','khachhang01','2023-12-21 20:22:36',1,'phuong thuc thanh toan',1.00,5.75,'cua hang','dia chi cua hang','0123456789','nguoi nhan','dia chi nguoi nhan','0123456789',35,'mo ta hang hoa','tracking number 31','ghi chu','lich su','Kho-04','Chuyen-kho',2.00,2.20,0),(53,'khachhang01','2023-11-07 15:21:35','khachhang01','2023-12-24 12:26:37',1,'phuong thuc thanh toan',1.00,5.75,'cua hang','dia chi cua hang','0123456789','nguoi nhan','dia chi nguoi nhan','0123456789',35,'mo ta hang hoa','tracking number 32','ghi chu','lich su','Kho-05','Chuyen-kho',2.00,2.20,0),(54,'khachhang01','2023-11-07 15:21:52','khachhang01','2023-12-21 19:39:13',0,'phuong thuc thanh toan',0.00,5.75,'cua hang','dia chi cua hang','0123456789','nguoi nhan','dia chi nguoi nhan','0123456789',35,'mo ta hang hoa','tracking number 33','ghi chu','lich su','Kho-03','Da-giao-hang',2.00,2.20,0),(57,'khachhang02','2023-11-07 15:23:09','khachhang02','2023-12-21 20:23:04',10,'phuong thuc thanh toan',50.75,5.75,'cua hang','dia chi cua hang','0123456789','nguoi nhan','dia chi nguoi nhan','0123456789',35,'mo ta hang hoa','tracking number 36','ghi chu','lich su',NULL,NULL,2.00,2.20,0),(58,'khachhang02','2023-11-07 15:23:12','khachhang02','2023-12-24 12:28:57',10,'phuong thuc thanh toan',50.75,5.75,'cua hang','dia chi cua hang','0123456789','nguoi nhan','dia chi nguoi nhan','0123456789',35,'mo ta hang hoa','tracking number 37','ghi chu','lich su','Kho-04','Chuyen-kho',2.00,2.20,0),(59,'khachhang01','2023-12-17 10:54:40',NULL,'2023-12-17 10:54:40',1,'phuong thuc thanh toan',1.00,1.00,'0','0','0','0','0','0',NULL,'0','iM6OQUKcHU','0','lich su',NULL,NULL,2.00,2.20,0),(60,'khachhang01','2023-12-17 11:14:11',NULL,'2023-12-24 12:22:39',1,'1',1.00,1.00,'1','1','1','1','1','1',35,'1','YzmbxYP6HW','1','lich su',NULL,NULL,2.00,2.20,0),(61,'khachhang01','2023-12-24 11:54:55',NULL,'2023-12-24 12:03:39',8,'chuyển khoản',50115.00,10000.00,'abc','abc','0123456789','xyz','xyz','0123456789',35,'acx','3yLGQ4AYvE','acx','lich su','Kho-03','Dang-di-lay',2.00,2.20,0),(62,'khachhang01','2023-12-24 12:31:46',NULL,'2023-12-24 12:33:25',1,'chuyển khoản',250000.00,10000.00,'vũ mạnh cường','145 nguyễn ái quốc','0123456789','lý tiến thành','70b nguyễn văn tiên','0123456789',35,'giày','kClK0ZhtbK','','lich su','Kho-05','Chuyen-kho',2.00,2.20,0),(63,'khachhang01','2023-12-31 15:06:19',NULL,'2023-12-31 15:08:07',1,'phuong thuc thanh toan',100000.00,10000.00,'nguoi gui','abc','0123456789','nguoi nhan','abc','0123456789',35,'','cID8HFHDI7','','lich su','Kho-05','Chuyen-kho',2.00,2.20,0),(64,'khachhang01','2024-04-19 22:47:40',NULL,'2024-04-19 22:55:29',5,'chuyển khoản',500000.00,50000.00,'cửa hàng thời trang ABC','địa chỉ cửa hàng','0123456789','nguyễn văn a','địa chỉ người nhận','0987654321',38,'2 áo 3 quần','1pvqfh8idC','gói đẹp','lich su','Kho-03','Chuyen-kho',2.00,2.20,0);
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipmentstatus`
--

DROP TABLE IF EXISTS `shipmentstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `shipmentstatus` (
  `code` varchar(255) NOT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `statusname` varchar(255) NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipmentstatus`
--

LOCK TABLES `shipmentstatus` WRITE;
/*!40000 ALTER TABLE `shipmentstatus` DISABLE KEYS */;
INSERT INTO `shipmentstatus` VALUES ('Cho-chuyen-hoan',NULL,NULL,NULL,NULL,'Chờ chuyển hoàn'),('Cho-lay-hang',NULL,NULL,NULL,NULL,'Chờ lấy hàng'),('Chuyen-hoan',NULL,NULL,NULL,NULL,'Chuyển hoàn'),('Chuyen-kho',NULL,NULL,NULL,NULL,'Chuyển kho'),('Da-giao-hang',NULL,NULL,NULL,NULL,'Đã giao hàng'),('Dang-di-lay',NULL,NULL,NULL,NULL,'Đang đi lấy'),('Dang-giao-hang',NULL,NULL,NULL,NULL,'Đang giao hàng'),('Huy',NULL,NULL,NULL,NULL,'Hủy'),('Khong-gap-khach',NULL,NULL,NULL,NULL,'Không gặp khách');
/*!40000 ALTER TABLE `shipmentstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdby` varchar(255) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `beginworkdate` datetime DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `endworkdate` datetime DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `isactived` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `workstore_code` varchar(255) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`),
  KEY `FK_user_workstore` (`workstore_code`),
  CONSTRAINT `FK_user_workstore` FOREIGN KEY (`workstore_code`) REFERENCES `workstore` (`code`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (34,NULL,'2023-11-03 15:24:18',NULL,'2023-12-17 23:00:49','bien hoa dong nai','2023-10-12 07:00:00','2002-09-07 07:00:00','admin@gmail.com',NULL,'admin',1,1,'bf4ab447496f2d3d5a6c77c2cd12f996','0123456789','admin',NULL,'ADMIN'),(35,NULL,'2023-11-07 12:14:18',NULL,'2023-12-21 20:25:22','bien hoa dong nai','2023-10-12 07:00:00','2002-01-01 07:00:00','nhanvien02@gmail.com',NULL,'nhân viên 02',1,1,'bf4ab447496f2d3d5a6c77c2cd12f996','0123456789','nhanvien02',NULL,'EMPLOYEE'),(36,NULL,'2023-11-07 12:14:52',NULL,'2023-12-24 12:34:31','bien hoa dong nai','2023-10-12 07:00:00','2001-01-01 07:00:00','ltt@gmail.com',NULL,'Lý Tiến Thành',1,1,'bf4ab447496f2d3d5a6c77c2cd12f996','0123456789','khachhang01',NULL,'CUSTOMER'),(37,NULL,'2023-11-07 15:22:51',NULL,'2023-12-17 10:50:59','bien hoa dong nai','2023-10-12 07:00:00','2002-09-07 07:00:00','khachhang02@gmail.com',NULL,'khách hàng 02',1,0,'bf4ab447496f2d3d5a6c77c2cd12f996','0123456789','khachhang02',NULL,'CUSTOMER'),(38,NULL,'2023-12-17 11:16:22',NULL,'2023-12-17 11:16:22','bien hoa dong nai','2023-10-12 07:00:00','2002-09-07 07:00:00','nhanvien01@gmail.com',NULL,'nhân viên 01',1,1,'bf4ab447496f2d3d5a6c77c2cd12f996','0123456789','nhanvien01',NULL,'EMPLOYEE'),(40,NULL,'2023-12-17 23:10:03',NULL,'2023-12-17 23:17:31','bien hoa dong nai','2023-10-12 07:00:00','2002-09-07 07:00:00','ltt2@gmail.com',NULL,'Lý Tiến Thành',1,1,'bf4ab447496f2d3d5a6c77c2cd12f996','0123456789','lytienthanh',NULL,'CUSTOMER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workstore`
--

DROP TABLE IF EXISTS `workstore`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `workstore` (
  `code` varchar(255) NOT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifiedby` varchar(255) DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `storename` varchar(255) NOT NULL,
  `address` text,
  `phonenumber` varchar(15) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`code`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workstore`
--

LOCK TABLES `workstore` WRITE;
/*!40000 ALTER TABLE `workstore` DISABLE KEYS */;
INSERT INTO `workstore` VALUES ('Kho-01',NULL,'2023-11-03 11:31:15',NULL,'2023-11-03 11:31:15','Kho 1','123 Đường ABC, Quận XYZ','123-456-7890',NULL),('Kho-02',NULL,'2023-11-03 11:31:15',NULL,'2023-11-03 11:31:15','Kho 2','456 Đường XYZ, Quận ABC','987-654-3210',NULL),('Kho-03',NULL,'2023-11-03 11:31:15',NULL,'2023-11-03 11:31:15','Kho 3','789 Đường LMN, Quận PQR','111-222-3333',NULL),('Kho-04',NULL,'2023-11-03 11:31:15',NULL,'2023-11-03 11:31:15','Kho 4','101 Đường UVW, Quận HIJ','444-555-6666',NULL),('Kho-05',NULL,'2023-11-03 11:31:15',NULL,'2023-11-03 11:31:15','Kho 5','202 Đường DEF, Quận GHI','777-888-9999',NULL);
/*!40000 ALTER TABLE `workstore` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-19 23:32:55
