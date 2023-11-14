-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "members" TEXT[]
);

-- CreateTable
CREATE TABLE "files" (
    "group_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "groups_id_key" ON "groups"("id");

-- CreateIndex
CREATE UNIQUE INDEX "groups_code_key" ON "groups"("code");

-- CreateIndex
CREATE UNIQUE INDEX "files_url_key" ON "files"("url");
