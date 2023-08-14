/*
  Warnings:

  - The primary key for the `HoldfastUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Invite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserRoles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `holdfastRole` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `HoldfastUser` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Invite` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserRoles` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `roleId` VARCHAR(191) NOT NULL,
    MODIFY `holdfastUserId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `holdfastRole` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
