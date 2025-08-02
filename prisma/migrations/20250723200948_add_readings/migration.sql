/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Plant` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Reading" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plantId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "turbidity" REAL NOT NULL,
    "chlorine" REAL NOT NULL,
    "ph" REAL NOT NULL,
    "flowIn" REAL NOT NULL,
    "flowOut" REAL NOT NULL,
    "tankLevel" REAL NOT NULL,
    CONSTRAINT "Reading_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Plant" ("id", "name") SELECT "id", "name" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
