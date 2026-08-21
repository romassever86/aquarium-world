import express from "express";

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", "views");



app.get("/", (req, res) => {
  res.render("home");
});

app.get("/faq", (req, res) => {
  res.render("faq");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});