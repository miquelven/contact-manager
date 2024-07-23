/*
  Warnings:

  - Made the column `status` on table `Contact` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Contact` MODIFY `status` BOOLEAN NOT NULL;
