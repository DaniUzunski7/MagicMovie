import express from "express";

import { movieServices } from "../services/movieService.js";

const router = express.Router();

router.get("/", (req, res) => {
  const movies = movieServices.getAllMovies();
  
  res.render("home", { movies }); //Temporary 
});

router.get("/about", (req, res) => {
  res.render("about");
});

export default router;