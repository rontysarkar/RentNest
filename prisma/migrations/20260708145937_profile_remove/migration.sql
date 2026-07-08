/*
  Warnings:

  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "profilePhoto" TEXT;

-- DropTable
DROP TABLE "profiles";
