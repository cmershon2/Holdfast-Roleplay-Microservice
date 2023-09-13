/*
  Warnings:

  - You are about to drop the column `serverName` on the `ServerEvent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serverId]` on the table `ServerEvent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serverId` to the `ServerEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ServerEvent` DROP COLUMN `serverName`,
    ADD COLUMN `serverId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Server` (
    `id` VARCHAR(191) NOT NULL,
    `serverName` VARCHAR(191) NOT NULL,
    `status` ENUM('ONLINE', 'OFFLINE', 'TIMEOUT') NOT NULL,

    UNIQUE INDEX `Server_serverName_key`(`serverName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ServerEvent_serverId_key` ON `ServerEvent`(`serverId`);
