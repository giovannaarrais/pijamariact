ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "image_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "image_url" DROP NOT NULL;
