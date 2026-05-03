-- AlterTable: add Google OAuth tokens to User
ALTER TABLE "User" ADD COLUMN "googleAccessToken" TEXT,
ADD COLUMN "googleRefreshToken" TEXT,
ADD COLUMN "googleTokenExpiry" TIMESTAMP(3);

-- AlterTable: add Google Sheets sync fields to Form
ALTER TABLE "Form" ADD COLUMN "googleSheetsEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "googleSheetId" TEXT,
ADD COLUMN "googleSheetTab" TEXT;
