import express from "express";
import { all, get, run } from "./database/db.mjs";

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const zones = await all("SELECT * FROM zones");
  res.render("home", { zones });
});

app.get("/faq", (req, res) => {
  res.render("faq");
});

app.get("/zones/:slug", async (req, res) => {
  const zone = await get("SELECT * FROM zones WHERE slug = ?", [req.params.slug]);
  if (!zone) {
    return res.status(404).send("Zone not found");
  }
  const exhibits = await all("SELECT * FROM exhibits WHERE zone_id = ?", [zone.id]);
  res.render("zone", { zone, exhibits });
});

app.get("/contact", (req, res) => {
  res.render("contact", { errors: null, submitted: false });
});

app.post("/contact", (req, res) => {
  const name = (req.body.name || "").trim();
  const email = (req.body.email || "").trim();
  const message = (req.body.message || "").trim();

  const errors = [];
  if (name.length === 0) errors.push("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Please enter a valid email address.");
  if (message.length === 0) errors.push("Please enter a message.");

  if (errors.length > 0) {
    return res.status(400).render("contact", { errors, submitted: false });
  }

  run("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)", [name, email, message]);
  res.render("contact", { errors: null, submitted: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
