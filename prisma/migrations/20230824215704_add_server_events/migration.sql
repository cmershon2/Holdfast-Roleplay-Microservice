-- CreateTable
CREATE TABLE `ServerEvent` (
    `id` VARCHAR(191) NOT NULL,
    `serverName` VARCHAR(191) NOT NULL,
    `eventType` ENUM('START', 'END', 'HEARTBEAT') NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `playerCount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
