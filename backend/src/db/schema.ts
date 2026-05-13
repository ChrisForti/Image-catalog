import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const techniques = pgTable("techniques", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),

  // Core SOP Fields
  locationContext: text("location_context").notNull(), // e.g., "High-vibration area," "High-moisture/Head"
  material: text("material").notNull(), // e.g., "Teak", "Mahogany", "Marine Plywood"
  customerSpecs: text("customer_specs"), // Customer requirements

  applicationLogic: text("application_logic").notNull(), // WHY this hardware was chosen
  techniqueDetails: text("technique_details").notNull(), // Step-by-step instructions (markdown supported)
  materialConstraints: text("material_constraints"), // Wood grain, screw depth, adhesive notes

  // Hardware & Parts
  hardwareName: text("hardware_name"), // e.g., "Blum Hinge", "Southco Latch"
  hardwarePart: text("hardware_part"), // Part numbers

  // Media
  imageUrl: text("image_url"), // High-res photo of installation
  additionalImages: text("additional_images"), // JSON array of image URLs

  // Metadata
  isTechnicalSOP: boolean("is_technical_sop").notNull().default(true),
  tags: text("tags"), // JSON array for searchability

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: text("category"),
  tags: text("tags"), // JSON array

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Technique = typeof techniques.$inferSelect;
export type NewTechnique = typeof techniques.$inferInsert;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type NewGalleryItem = typeof galleryItems.$inferInsert;
