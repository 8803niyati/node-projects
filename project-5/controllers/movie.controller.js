const Movie = require("../models/movie.model");

exports.getMovies = async (req, res) => {
  try {
    const { search, year, sort } = req.query;
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    let moviesQuery = Movie.find(filter);

    if (sort === "title_asc") {
      moviesQuery = moviesQuery.sort({ title: 1 });
    } else if (sort === "title_desc") {
      moviesQuery = moviesQuery.sort({ title: -1 });
    } else if (sort === "year_asc") {
      moviesQuery = moviesQuery.sort({ year: 1 });
    } else if (sort === "year_desc") {
      moviesQuery = moviesQuery.sort({ year: -1 });
    } else {
   
      moviesQuery = moviesQuery.sort({ createdAt: -1 });
    }

    const movies = await moviesQuery;

    res.render("movies", {
      movies,
      search: search || "",
      year: year || "",
      sort: sort || "",
    });
  } catch (err) {
    res.status(500).send("Error fetching movies: " + err.message);
  }
};


exports.addMovieForm = (req, res) => {
  res.render("add-movie");
};
exports.addMovie = async (req, res) => {
  try {
    const {
      title,
      genre,
      year,
      releaseDate,
      director,
      rating,
      language,
      description,
    } = req.body;

    const poster = req.file ? req.file.path : null;

    const movie = new Movie({
      title,
      genre,
      year,
      releaseDate,
      director,
      rating,
      language,
      description,
      poster,
    });

    await movie.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error adding movie: " + err.message);
  }
};

exports.editMovieForm = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.render("edit-movie", { movie });
  } catch (err) {
    res.status(500).send("Error loading edit form: " + err.message);
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const {
      title,
      genre,
      year,
      releaseDate,
      director,
      rating,
      language,
      description,
    } = req.body;

    const updateData = {
      title,
      genre,
      year,
      releaseDate,
      director,
      rating,
      language,
      description,
    };

    if (req.file) {
      updateData.poster = req.file.path;
    }

    await Movie.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error updating movie: " + err.message);
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error deleting movie: " + err.message);
  }
};
exports.viewMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.render("view-movie", { movie });
  } catch (err) {
    res.status(500).send("Error fetching movie: " + err.message);
  }
};