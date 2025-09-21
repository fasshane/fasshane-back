-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('PENDING', 'APPROVED', 'HIDDEN', 'SPAM');

-- CreateTable
CREATE TABLE "FeedbackContact" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phoneE164" TEXT,
    "phoneRegion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedbackContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "ratingFood" INTEGER,
    "ratingService" INTEGER,
    "comment" TEXT,
    "allowContact" BOOLEAN NOT NULL DEFAULT false,
    "visitorId" VARCHAR(64),
    "deviceHash" VARCHAR(128),
    "ipHash" VARCHAR(64),
    "uaHash" VARCHAR(64),
    "periodKey" VARCHAR(20) NOT NULL,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'PENDING',
    "source" TEXT,
    "locale" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactId" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackContact_email_key" ON "FeedbackContact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackContact_phoneE164_key" ON "FeedbackContact"("phoneE164");

-- CreateIndex
CREATE INDEX "idx_feedback_ipua_time" ON "Feedback"("ipHash", "uaHash", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "uniq_feedback_visitor_period" ON "Feedback"("visitorId", "periodKey");

-- CreateIndex
CREATE UNIQUE INDEX "uniq_feedback_device_period" ON "Feedback"("deviceHash", "periodKey");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "FeedbackContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
