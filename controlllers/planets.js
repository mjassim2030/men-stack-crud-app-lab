const Planet = require("../models/planet");
const router = require('express').Router();


// --------- All CRUD operations ---------

// API's / Routes
router.get('/', async (req, res) => {
  const planets = await Planet.find()
  const isHabitable = planets.filter(planet => planet.isHabitable).length;
  const isInHabitable = planets.length - isHabitable
  res.render('index.ejs', {isHabitable, isInHabitable})
});

// New Planet Route
router.get("/planets/new", async (req, res) => {
  res.render("planets/new.ejs");
});

// Post New Planet Route
router.post("/planets", async (req, res) => {
  req.body.isHabitable = req.body.isHabitable === "on";
  await Planet.create(req.body);
  res.redirect("/planets");
});


// Read All or Specific Planet Route
router.get("/planets", async (req, res) => {
  const planets = req.query.id === undefined ? await Planet.find() : await Planet.findById(req.query.id);
  res.render("planets/show.ejs", { planets: planets, isArray: Array.isArray(planets) });
});

// Update Specific Planet Route
router.get('/planets/edit', async (req, res) => {
  if (req.query.id === undefined) {
    res.redirect("/planets")
  } else {
    const planet = await Planet.findById(req.query.id);
    res.render('planets/edit.ejs', { planet })
  }
});

// Update One Planet Route
router.put("/planets", async (req, res) => {
  req.body.isHabitable = req.body.isHabitable === "on";
  await Planet.findByIdAndUpdate(req.query.id, req.body);
  res.redirect(`/planets?id=${req.query.id}`);
});

// Delete a Planet Route
router.delete("/planets", async (req, res) => {
  await Planet.findByIdAndDelete(req.query.id);
  res.redirect(`/planets`);
});

module.exports = router;