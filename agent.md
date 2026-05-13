# MISSION: Nautical Carpentry Knowledge Base (SOP)

## Core Logic
The app must allow carpenters to document specific "Techniques" and "Hardware Applications" based on three variables: Location, Material, and Customer Specs.

## 1. Database Schema Updates (Drizzle)
Add these specific columns to `gallery_items` or a dedicated `techniques` table:
- **location_context**: (text) e.g., "High-vibration area," "High-moisture/Head," "Exterior/Aft Deck."
- **application_logic**: (text) Explain WHY this hardware was chosen (e.g., "Customer requested soft-close due to heavy sea-state use").
- **technique_details**: (text/markdown) Instructions for specific joinery or fastening methods used.
- **material_constraints**: (text) Notes on wood grain orientation, screw depth for specific veneers, or adhesive types.

## 2. Frontend Requirement: "The Technique Feed"
- Create a 'Master Search' that queries across: 
  - [Hardware Name] + [Material] + [Location].
  - Example: "Blum Hinge" + "Teak" + "Upper Galley Cabinet."
- Implementation: Use a "Technical Card" UI that displays:
  - High-res photo of the technique/hardware install.
  - Sidebar with "Application Specs" (Material, Location, Specs).
  - Main body with "Step-by-Step Build Instructions."

## 3. Scripting Task for Copilot
"Generate a React form that allows me to quickly toggle between 'General Gallery' and 'Technical SOP'. If 'Technical SOP' is selected, the form must require entries for Location, Material, and Technique Instructions before the user can hit Save."
