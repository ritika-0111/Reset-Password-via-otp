CREATE DATABASE IF NOT EXISTS `users`;
USE users;



DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (

  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `mobile` VARCHAR(15) NULL,
  `email` VARCHAR(50) NULL,
  `password` VARCHAR(80) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `otp` VARCHAR(10) DEFAULT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_mobile` (`mobile` ASC),
  UNIQUE INDEX `uq_email` (`email` ASC)
  );