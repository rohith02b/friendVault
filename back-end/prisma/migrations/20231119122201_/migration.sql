/*
  Warnings:

  - You are about to drop the `files` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "files";

-- CreateTable
CREATE TABLE "content" (
    "content_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "content_name" TEXT NOT NULL,
    "content_type" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "content_content_id_key" ON "content"("content_id");
