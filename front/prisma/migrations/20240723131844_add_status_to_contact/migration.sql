-- prisma/migrations/20240723131844_add_status_to_contact/migration.sql

ALTER TABLE `Contact` ADD COLUMN `status` BOOLEAN DEFAULT false;
