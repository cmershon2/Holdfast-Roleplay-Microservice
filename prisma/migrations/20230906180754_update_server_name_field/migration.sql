/*
  Warnings:

  - You are about to drop the column `serverName` on the `Server` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Server` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Server_serverName_key` ON `Server`;

-- AlterTable
ALTER TABLE `Server` DROP COLUMN `serverName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Server_name_key` ON `Server`(`name`);
