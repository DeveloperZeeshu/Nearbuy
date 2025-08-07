CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(255),
	`price` decimal(10,2) NOT NULL,
	`is_available` boolean NOT NULL DEFAULT true,
	`category` varchar(50),
	`image` varchar(255),
	`shop_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_shop_id_shops_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON DELETE cascade ON UPDATE no action;
