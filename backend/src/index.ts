import dotenv from "dotenv";
// Load environment variables FIRST before other imports
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import multer from "multer";
import { z } from "zod";
import { db } from "./db";
import { techniques, galleryItems } from "./db/schema";
import { eq, like, and, or } from "drizzle-orm";

const app = express();
const PORT = process.env.PORT || 3001;
const UPLOAD_DIR = process.env.UPLOAD_DIR || "./uploads";

// CORS configuration for production
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(UPLOAD_DIR));

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

// Validation schemas
const techniqueSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  locationContext: z.string().min(1),
  material: z.string().min(1),
  customerSpecs: z.string().optional(),
  applicationLogic: z.string().min(1),
  techniqueDetails: z.string().min(1),
  materialConstraints: z.string().optional(),
  hardwareName: z.string().optional(),
  hardwarePart: z.string().optional(),
  imageUrl: z.string().optional(),
  additionalImages: z.string().optional(),
  tags: z.string().optional(),
});

const galleryItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().min(1),
  category: z.string().optional(),
  tags: z.string().optional(),
});

// ============================================
// TECHNIQUE ENDPOINTS (Technical SOP)
// ============================================

// Get all techniques with optional search
app.get("/api/techniques", async (req: Request, res: Response) => {
  try {
    const { search, material, location, hardware } = req.query;

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(techniques.title, `%${search}%`),
          like(techniques.description, `%${search}%`),
          like(techniques.techniqueDetails, `%${search}%`),
        ),
      );
    }

    if (material) {
      conditions.push(like(techniques.material, `%${material}%`));
    }

    if (location) {
      conditions.push(like(techniques.locationContext, `%${location}%`));
    }

    if (hardware) {
      conditions.push(like(techniques.hardwareName, `%${hardware}%`));
    }

    const results = conditions.length > 0
      ? await db.select().from(techniques).where(and(...conditions))
      : await db.select().from(techniques);

    res.json(results);
  } catch (error) {
    console.error("Error fetching techniques:", error);
    res.status(500).json({ error: "Failed to fetch techniques" });
  }
});

// Get single technique by ID
app.get("/api/techniques/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await db
      .select()
      .from(techniques)
      .where(eq(techniques.id, id));

    if (result.length === 0) {
      return res.status(404).json({ error: "Technique not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching technique:", error);
    res.status(500).json({ error: "Failed to fetch technique" });
  }
});

// Create new technique
app.post("/api/techniques", async (req: Request, res: Response) => {
  try {
    const validatedData = techniqueSchema.parse(req.body);

    const result = await db
      .insert(techniques)
      .values({
        ...validatedData,
        isTechnicalSOP: true,
      })
      .returning();

    res.status(201).json(result[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error creating technique:", error);
    res.status(500).json({ error: "Failed to create technique" });
  }
});

// Update technique
app.put("/api/techniques/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = techniqueSchema.partial().parse(req.body);

    const result = await db
      .update(techniques)
      .set({ ...validatedData, updatedAt: new Date() })
      .where(eq(techniques.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Technique not found" });
    }

    res.json(result[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error updating technique:", error);
    res.status(500).json({ error: "Failed to update technique" });
  }
});

// Delete technique
app.delete("/api/techniques/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(techniques).where(eq(techniques.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting technique:", error);
    res.status(500).json({ error: "Failed to delete technique" });
  }
});

// ============================================
// GALLERY ENDPOINTS
// ============================================

// Get all gallery items
app.get("/api/gallery", async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query;

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(galleryItems.title, `%${search}%`),
          like(galleryItems.description, `%${search}%`),
        ),
      );
    }

    if (category) {
      conditions.push(like(galleryItems.category, `%${category}%`));
    }

    const results = conditions.length > 0
      ? await db.select().from(galleryItems).where(and(...conditions))
      : await db.select().from(galleryItems);

    res.json(results);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    res.status(500).json({ error: "Failed to fetch gallery items" });
  }
});

// Get single gallery item
app.get("/api/gallery/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await db
      .select()
      .from(galleryItems)
      .where(eq(galleryItems.id, id));

    if (result.length === 0) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching gallery item:", error);
    res.status(500).json({ error: "Failed to fetch gallery item" });
  }
});

// Create gallery item
app.post("/api/gallery", async (req: Request, res: Response) => {
  try {
    const validatedData = galleryItemSchema.parse(req.body);

    const result = await db
      .insert(galleryItems)
      .values(validatedData)
      .returning();

    res.status(201).json(result[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error creating gallery item:", error);
    res.status(500).json({ error: "Failed to create gallery item" });
  }
});

// Update gallery item
app.put("/api/gallery/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = galleryItemSchema.partial().parse(req.body);

    const result = await db
      .update(galleryItems)
      .set({ ...validatedData, updatedAt: new Date() })
      .where(eq(galleryItems.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Gallery item not found" });
    }

    res.json(result[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error updating gallery item:", error);
    res.status(500).json({ error: "Failed to update gallery item" });
  }
});

// Delete gallery item
app.delete("/api/gallery/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(galleryItems).where(eq(galleryItems.id, id));
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    res.status(500).json({ error: "Failed to delete gallery item" });
  }
});

// ============================================
// IMAGE UPLOAD ENDPOINT
// ============================================

app.post(
  "/api/upload",
  upload.single("image"),
  (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  },
);

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${UPLOAD_DIR}`);
});
