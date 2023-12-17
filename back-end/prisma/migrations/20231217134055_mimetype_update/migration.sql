/*
  Warnings:

  - Added the required column `content_mimetype` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "content" ADD COLUMN     "content_mimetype" TEXT NOT NULL;
