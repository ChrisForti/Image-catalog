CREATE TABLE IF NOT EXISTS "gallery_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image_url" text NOT NULL,
	"category" text,
	"tags" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "techniques" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"location_context" text NOT NULL,
	"material" text NOT NULL,
	"customer_specs" text,
	"application_logic" text NOT NULL,
	"technique_details" text NOT NULL,
	"material_constraints" text,
	"hardware_name" text,
	"hardware_part" text,
	"image_url" text,
	"additional_images" text,
	"is_technical_sop" boolean DEFAULT true NOT NULL,
	"tags" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
