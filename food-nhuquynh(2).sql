-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2023 at 11:27 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food-nhuquynh`
--

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `name`, `price`, `image`) VALUES
(4, 'bánh xèo', '80000', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhUTExMWFhUXGB8bGBgYGB4bHhsfGxwcHh4hIhobHikhHSInHhsXIzIiJiosLy8vFyA0OTQuOCkuLywBCgoKDg0OHBAQHC4nICcuLiwxNzYwLi4uLy4zLi4wLi4zMC4uMC4uLi4uLi4uLjAuLi4uLi4uLi4uLi4uLjAuLv/AABEIAKsBJwMBIgACEQEDEQH/'),
(7, 'hủ tiếu', '100000', 'https://t4.ftcdn.net/jpg/01/28/39/95/360_F_128399517_5yToiSKPErFd5hMfrvcLX8SQ6bVqca6X.jpg'),
(27, 'dd', 'dd', 'dd'),
(44, 'vvv', 'vv', 'vv'),
(339, 'test', 'test', 'test'),
(9500, 'kkk', 'kkk', 'kkk'),
(529120, 'vvv', 'vv', 'vv'),
(529121, 'vvv', 'vv', 'vv');

-- --------------------------------------------------------

--
-- Table structure for table `history_booking`
--

CREATE TABLE `history_booking` (
  `id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `id_invoice` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history_booking`
--

INSERT INTO `history_booking` (`id`, `content`, `id_invoice`) VALUES
(6, ' đã đặt bàn vào lúc 4/21/2023, 8:21:41 PM', '45ddd4fe-66ed-48ec-bb19-1227daf03bd4'),
(7, ' đã đặt bàn vào lúc 4/21/2023, 8:21:41 PM', '45ddd4fe-66ed-48ec-bb19-1227daf03bd4'),
(8, 'aaaa đã đặt bàn vào lúc 4/21/2023, 8:24:58 PM', 'a26c7587-0acb-4c5f-b740-9b4a4e55b4ba'),
(9, 'khách 8  đã đặt bàn vào lúc 4/21/2023, 10:10:39 PM', 'b6679f02-7423-47f0-83f5-a945afba729f'),
(10, 'khách bàn 1 đã đặt bàn vào lúc 4/21/2023, 10:14:21 PM', '0ffe0bc6-84b2-476c-9e1f-16a7ced7038a');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_detail`
--

CREATE TABLE `invoice_detail` (
  `fk_id_tablefood` varchar(255) NOT NULL,
  `fk_id_food` varchar(100) NOT NULL,
  `fk_id_invoice` varchar(255) NOT NULL,
  `total_price` varchar(255) NOT NULL,
  `description_order_food` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice_detail`
--

INSERT INTO `invoice_detail` (`fk_id_tablefood`, `fk_id_food`, `fk_id_invoice`, `total_price`, `description_order_food`) VALUES
('3b5abece-819b-4f67-aeea-ef2952ceae31', '[529119]', '0ffe0bc6-84b2-476c-9e1f-16a7ced7038a', '240000', '[{\"id\":529119,\"quantity\":\"2\",\"price\":\"120000\"}]'),
('e68aa228-ab4a-48c9-a1fb-e660cba6efd9', '[529119]', '5c248de4-17cf-46da-9a24-5b0e5970b3e0', '360000', '[{\"id\":529119,\"quantity\":\"3\",\"price\":\"120000\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_table`
--

CREATE TABLE `invoice_table` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `time_eat` varchar(255) NOT NULL,
  `fk_id_user` varchar(255) NOT NULL,
  `fk_table` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice_table`
--

INSERT INTO `invoice_table` (`id`, `name`, `time_eat`, `fk_id_user`, `fk_table`) VALUES
('0ffe0bc6-84b2-476c-9e1f-16a7ced7038a', 'khách 8 ', '2023-04-22', 'debf3ca8-0603-4b4d-8659-4a45d63e0f09', '3b5abece-819b-4f67-aeea-ef2952ceae31'),
('45ddd4fe-66ed-48ec-bb19-1227daf03bd4', 'khách bàn 8', '2333-12-31', 'b5eb49e6-bc0f-4bba-ab92-b62104066fdf', '3b5abece-819b-4f67-aeea-ef2952ceae31'),
('5c248de4-17cf-46da-9a24-5b0e5970b3e0', 'khách bàn 1', '2023-04-29', 'debf3ca8-0603-4b4d-8659-4a45d63e0f09', 'e68aa228-ab4a-48c9-a1fb-e660cba6efd9'),
('7e682bf6-4e1a-4897-aa96-ceb72c3e2d4f', 'dat ban 1', '2023-04-22', 'b5eb49e6-bc0f-4bba-ab92-b62104066fdf', 'e68aa228-ab4a-48c9-a1fb-e660cba6efd9'),
('97112341-9c9a-47bb-86e9-ac03f9b58c7c', 'khanh đặt bàn 6', '1111-11-21', 'debf3ca8-0603-4b4d-8659-4a45d63e0f09', 'c75a4002-5fdf-482f-a802-5260341b0e2f'),
('a26c7587-0acb-4c5f-b740-9b4a4e55b4ba', 'aa', '2023-04-22', 'b5eb49e6-bc0f-4bba-ab92-b62104066fdf', '94796532-5119-4acb-93cb-c2c78943b6ee'),
('a49a7066-94b1-4bac-9e5b-1ff04e8ec342', 'bàn 8', '2222-12-12', 'debf3ca8-0603-4b4d-8659-4a45d63e0f09', '3b5abece-819b-4f67-aeea-ef2952ceae31'),
('b6679f02-7423-47f0-83f5-a945afba729f', 'aaaa', '2023-04-29', 'b5eb49e6-bc0f-4bba-ab92-b62104066fdf', '8ac56524-a135-42a8-94c7-4251706e6f40');

-- --------------------------------------------------------

--
-- Table structure for table `tablefood`
--

CREATE TABLE `tablefood` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tablefood`
--

INSERT INTO `tablefood` (`id`, `name`, `status`) VALUES
('3b5abece-819b-4f67-aeea-ef2952ceae31', 'bàn 8', 0),
('8ac56524-a135-42a8-94c7-4251706e6f40', 'bàn 4', 0),
('94796532-5119-4acb-93cb-c2c78943b6ee', 'bàn 7', 0),
('a8a0c748-3fed-4a7b-8940-cc3e5a8ffc8f', 'bàn 5', 0),
('c75a4002-5fdf-482f-a802-5260341b0e2f', 'bàn 6', 0),
('e68aa228-ab4a-48c9-a1fb-e660cba6efd9', 'bàn 1', 3);

-- --------------------------------------------------------

--
-- Table structure for table `type_account`
--

CREATE TABLE `type_account` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `type_account`
--

INSERT INTO `type_account` (`id`, `name`) VALUES
('1', 'customer'),
('72b0ed22-9d64-4bf2-9708-35ea731dc1bb', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `fk_id_type_account` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `username`, `password`, `phone`, `address`, `email`, `avatar`, `fk_id_type_account`) VALUES
('64968c9d-cda0-4c03-9871-8254d70e4c00', 'a2', 'a', 'a', 'a', 'a', 'a', 'a', 'a', '1'),
('b5eb49e6-bc0f-4bba-ab92-b62104066fdf', 'kien', 'hoquan', 'hoquan1', '123123', '1234', 'houston', 'hoquan2@gmail.com', 'https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg', '72b0ed22-9d64-4bf2-9708-35ea731dc1bb'),
('debf3ca8-0603-4b4d-8659-4a45d63e0f09', 'nguyen', 'khanh', 'phikhanh', '123123', '04567890', 'khanh address', 'khanh email', 'khanh avatar', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history_booking`
--
ALTER TABLE `history_booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_invoice` (`id_invoice`);

--
-- Indexes for table `invoice_detail`
--
ALTER TABLE `invoice_detail`
  ADD PRIMARY KEY (`fk_id_tablefood`,`fk_id_food`,`fk_id_invoice`),
  ADD KEY `fk_id_food` (`fk_id_food`),
  ADD KEY `fk_id_invoice` (`fk_id_invoice`);

--
-- Indexes for table `invoice_table`
--
ALTER TABLE `invoice_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_user` (`fk_id_user`);

--
-- Indexes for table `tablefood`
--
ALTER TABLE `tablefood`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `type_account`
--
ALTER TABLE `type_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_type_account` (`fk_id_type_account`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=529122;

--
-- AUTO_INCREMENT for table `history_booking`
--
ALTER TABLE `history_booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history_booking`
--
ALTER TABLE `history_booking`
  ADD CONSTRAINT `history_booking_ibfk_1` FOREIGN KEY (`id_invoice`) REFERENCES `invoice_table` (`id`);

--
-- Constraints for table `invoice_detail`
--
ALTER TABLE `invoice_detail`
  ADD CONSTRAINT `invoice_detail_ibfk_1` FOREIGN KEY (`fk_id_tablefood`) REFERENCES `tablefood` (`id`),
  ADD CONSTRAINT `invoice_detail_ibfk_3` FOREIGN KEY (`fk_id_invoice`) REFERENCES `invoice_table` (`id`);

--
-- Constraints for table `invoice_table`
--
ALTER TABLE `invoice_table`
  ADD CONSTRAINT `invoice_table_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`fk_id_type_account`) REFERENCES `type_account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
