-- AlterTable: Add UI customization fields to embed_configs
ALTER TABLE "embed_configs" ADD COLUMN "brand_image_url" TEXT;
ALTER TABLE "embed_configs" ADD COLUMN "no_sponsor" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "embed_configs" ADD COLUMN "sponsor_text" TEXT;
ALTER TABLE "embed_configs" ADD COLUMN "sponsor_link" TEXT;
ALTER TABLE "embed_configs" ADD COLUMN "language" TEXT NOT NULL DEFAULT 'en';
