-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APPROVED', 'REJECTED', 'PENDING');

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
