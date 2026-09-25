import { run } from "./db.mjs";

async function setup() {
  await run(`CREATE TABLE IF NOT EXISTS zones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS exhibits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zone_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (zone_id) REFERENCES zones(id)
  )`);

  await run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    event_date TEXT NOT NULL,
    description TEXT NOT NULL
  )`);

  const coralReef = await run(
    "INSERT INTO zones (name, slug, description, image) VALUES (?, ?, ?, ?)",
    ["Coral Reef Zone", "coral-reef", "A living rainbow beneath the waves, home to over 80 species of fish and coral.", "/images/coral-reef.jpg"]
  );

  const deepSea = await run(
    "INSERT INTO zones (name, slug, description, image) VALUES (?, ?, ?, ?)",
    ["Deep Sea Trench", "deep-sea-trench", "Descend into the midnight zone and meet creatures that make their own light.", "/images/deep-sea.jpg"]
  );

  const rockpools = await run(
    "INSERT INTO zones (name, slug, description, image) VALUES (?, ?, ?, ?)",
    ["Coastal Rockpools", "coastal-rockpools", "The seashore, up close and hands-on - roll up your sleeves and explore.", "/images/rockpools.jpg"]
  );

  const rivers = await run(
    "INSERT INTO zones (name, slug, description, image) VALUES (?, ?, ?, ?)",
    ["Rivers & Rainforest", "rivers-rainforest", "Follow fresh water from mountain to mangrove through a humid rainforest trail.", "/images/rivers.jpg"]
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

  const today = new Date();
  function daysFromToday(offset) {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  }

  const events = [
    ["Coral Spawning Night", "Seasonal celebrations", daysFromToday(-120), "A rare after-dark viewing of the reef's annual coral spawning event."],
    ["Deep Sea Guest Lecture", "Educational talks", daysFromToday(-40), "Marine biologist Dr Imani Okafor shares footage from three submarine expeditions."],
    ["Rockpool Family Day", "Family activities", daysFromToday(-10), "A hands-on day at the Coastal Rockpools with guided creature hunts."],
    ["After-Dark Torchlight Tour", "Family activities", daysFromToday(14), "Explore the Deep Sea Trench by torchlight after closing time."],
    ["Conservation Workshop", "Educational talks", daysFromToday(30), "Help our aquarists prepare coral fragments for reef restoration."],
    ["Summer Marine Festival", "Seasonal celebrations", daysFromToday(60), "A week of talks, trails and activities celebrating ocean life."],
    ["Otter Feeding Talk Special", "Family activities", daysFromToday(90), "An extended feeding session and Q&A with our otter keepers."],
    ["River Guardians Clean-Up", "Educational talks", daysFromToday(150), "Join a supervised river shoreline clean-up with our conservation team."]
  ];

  for (const [title, category, date, description] of events) {
    await run(
      "INSERT INTO events (title, category, event_date, description) VALUES (?, ?, ?, ?)",
      [title, category, date, description]
    );
  }

  console.log("Database created and seeded.");
  process.exit(0);
}

setup();
