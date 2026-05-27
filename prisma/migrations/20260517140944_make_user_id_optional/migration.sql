-- DropForeignKey
ALTER TABLE "user_readings" DROP CONSTRAINT "user_readings_userId_fkey";

-- AlterTable
ALTER TABLE "user_readings" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_readings" ADD CONSTRAINT "user_readings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
