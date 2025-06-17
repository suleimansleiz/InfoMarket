-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2025 at 08:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `infomarket`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` bigint(100) NOT NULL,
  `item_photo` varchar(100) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `item_price` double NOT NULL,
  `item_category` varchar(50) NOT NULL,
  `item_description` varchar(150) NOT NULL,
  `seller_name` varchar(30) NOT NULL,
  `seller_phone` varchar(13) NOT NULL,
  `posted_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `item_photo`, `item_name`, `item_price`, `item_category`, `item_description`, `seller_name`, `seller_phone`, `posted_date`) VALUES
(5, 'https://res.cloudinary.com/swd/image/upload/v1749579522/uge4kqtzv2bouxvucpqc.jpg', 'Gaming Laptop', 900000, 'Computers', 'Condition: Refurb,\r\nRAM: 16GB,\r\nROM: 256GB SSD...', 'Kikoti Computers', '+255743900555', '2025-06-10'),
(6, 'https://res.cloudinary.com/swd/image/upload/v1749596667/ezwtseobho0slfcos62k.jpg', 'Samsung S21', 450000, 'Phones', 'Used from dubai,\r\nStorage 256GB,\r\nRAM 8GB,\r\nClean as new', 'Sleiz phones', '+255743900555', '2025-06-11'),
(7, 'https://res.cloudinary.com/swd/image/upload/v1749823101/dw5gxqqe10abjiqpkuia.webp', 'Gaming Mouse', 35000, 'Accessories', 'Specific for gaming', 'Sleiz Phones', '+255743900555', '2025-06-13'),
(8, 'https://res.cloudinary.com/swd/image/upload/v1749837799/xbvvndlbioskhihpfkak.jpg', 'Laptop Bag', 30000, 'Bags', 'Portable laptop bag.\r\nBlack in color.\r\nUSB port included.', 'Sleiz Phones', '+255743900555', '2025-06-13'),
(9, 'https://res.cloudinary.com/swd/image/upload/v1749838803/u9celt6khwkntf7di0va.webp', 'iPhone 13 plain', 870000, 'Phones', 'RAM: 8GB,\r\nROM: 256GB,\r\nFace id: Yes,\r\nVery Clean', 'Mabizzo phonepoint', '+255746305311', '2025-06-13'),
(10, 'https://res.cloudinary.com/swd/image/upload/v1749839208/dlfvy8vbgf15aq5ghiz0.webp', 'Wireless Headphones', 45000, 'Accessories', 'Bluetooth connection,\r\n4hrs battery,\r\nHeavy bass.', 'Sarah & Accessories', '+255792423446', '2025-06-13'),
(11, 'https://res.cloudinary.com/swd/image/upload/v1749839491/sxacvwsjqcvhvbpsfya3.webp', 'Enclossure', 23000, 'Curteins', 'Long and Heavy.', 'T-Bags', '+255755936851', '2025-06-13');

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `seller_id` bigint(100) NOT NULL,
  `seller_name` varchar(50) NOT NULL,
  `seller_email` varchar(30) NOT NULL,
  `seller_phone` varchar(13) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`seller_id`, `seller_name`, `seller_email`, `seller_phone`, `password`) VALUES
(1, 'Sleiz Phones', 'sleiz@gmail.com', '+255743900555', '#20SULEiman'),
(2, 'Mabizzo phonepoint', 'mabenabizzo@gmail.com', '+255746305311', 'Mabizzo@2001'),
(4, 'Kikoti Computers', 'kikoti@gmail.com', '255743900555', 'P@55w0rd'),
(5, 'Sarah & Accessories', 'sarah@gmail.com', '+255792423446', 'P@55w0rd'),
(6, 'T-Bags', 'tbags@gmail.com', '+255755936851', 'Obadi@G00d');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`seller_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `seller_id` bigint(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
