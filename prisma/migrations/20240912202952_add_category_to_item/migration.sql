-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "category" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
