import express from "express";
import { all, get } from "./database/db.mjs";

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", "views");

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});