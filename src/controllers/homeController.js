import express from "express";
import movies from '../moviesData.js'

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { movies });
});

router.get("/about", (req, res) => {
  res.render("about");
});

export default router;