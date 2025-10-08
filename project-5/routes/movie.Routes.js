const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");
const upload = require("../middleware/upload");

router.get("/", movieController.getMovies);

router.get("/add", movieController.addMovieForm);
router.post("/add", upload.single("poster"), movieController.addMovie);

router.get("/edit/:id", movieController.editMovieForm);
router.post("/edit/:id", upload.single("poster"), movieController.updateMovie);

router.get("/delete/:id", movieController.deleteMovie);
router.get("/view/:id", movieController.viewMovie);


module.exports = router;