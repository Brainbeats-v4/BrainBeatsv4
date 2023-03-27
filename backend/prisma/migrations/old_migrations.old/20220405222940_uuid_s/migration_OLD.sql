/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `post` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_userId_fkey`;

-- AlterTable
ALTER TABLE `Profile` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `post` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(20) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Profile_id_key` ON `Profile`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_name_key` ON `user`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `user_username_key` ON `user`(`username`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
