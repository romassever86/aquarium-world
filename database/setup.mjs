import { run } from "./db.mjs";

async function setup() {
  await run(`CREATE TABLE IF NOT EXISTS zones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS exhibits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zone_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (zone_id) REFERENCES zones(id)
  )`);

  const coralReef = await run(
    "INSERT INTO zones (name, slug, description) VALUES (?, ?, ?)",
    ["Coral Reef Zone", "coral-reef", "A living rainbow beneath the waves, home to over 80 species of fish and coral."]
  );

  const deepSea = await run(
    "INSERT INTO zones (name, slug, description) VALUES (?, ?, ?)",
    ["Deep Sea Trench", "deep-sea-trench", "Descend into the midnight zone and meet creatures that make their own light."]
  );

  const rockpools = await run(
    "INSERT INTO zones (name, slug, description) VALUES (?, ?, ?)",
    ["Coastal Rockpools", "coastal-rockpools", "The seashore, up close and hands-on - roll up your sleeves and explore."]
  );

  const rivers = await run(
    "INSERT INTO zones (name, slug, description) VALUES (?, ?, ?)",
    ["Rivers & Rainforest", "rivers-rainforest", "Follow fresh water from mountain to mangrove through a humid rainforest trail."]
  );

  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [coralReef.lastID, "Living Reef Wall", "An 18-metre panoramic window onto a genuine living coral ecosystem."]
  );
  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [coralReef.lastID, "Reef Rescue Lab", "A working coral nursery where our aquarists grow coral fragments for restoration."]
  );

  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [deepSea.lastID, "The Midnight Tunnel", "Walk through a 30-metre underwater tunnel as sand tiger sharks glide overhead."]
  );
  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [deepSea.lastID, "Octopus Den", "Meet Nimbus, our giant Pacific octopus."]
  );

  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [rockpools.lastID, "The Touch Pool", "Gently meet starfish and hermit crabs in our supervised touch pool."]
  );
  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [rockpools.lastID, "Tide Cycle Tank", "A rockpool on a timer, showing how shore life copes with the changing tide."]
  );

  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [rivers.lastID, "Flooded Forest", "A recreation of the Amazon in flood season, home to giant arapaima fish."]
  );
  await run(
    "INSERT INTO exhibits (zone_id, name, description) VALUES (?, ?, ?)",
    [rivers.lastID, "Otter Lookout", "Our family of Asian short-clawed otters, with daily feeding talks."]
  );

  console.log("Database created and seeded.");
  process.exit(0);
}

setup();