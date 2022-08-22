-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "credit_card_number" TEXT NOT NULL,
    "credit_card_name" TEXT NOT NULL,
    "credit_card_cvv" TEXT NOT NULL,
    "credit_card_expiration_month" INTEGER NOT NULL,
    "credit_card_expiration_year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
