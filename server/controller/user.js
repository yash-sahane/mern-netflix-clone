import { User } from "../model/user.js";

export const addToLikedMovies = async (req, res, next) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const isMovieAlreadyLiked = await likedMovies.find(({ id }) => (id === data.id));
      if (!isMovieAlreadyLiked) {
        await User.findByIdAndUpdate(user._id, {
          likedMovies: [...user.likedMovies, data]
        }, { new: true })
        return res.json({
          success: true,
          message: "Movie added to liked list"
        });
      } else {
        return res.json({
          success: false,
          message: "Movie is already in liked list"
        })
      }
    } else {
      await User.create({ email, likedMovies: [data] });
      return res.json({
        success: true,
        message: "Movie added to liked list"
      })
    }
  } catch (e) {
    return res.json({
      success: false,
      message: e.message
    })
  }
}

export const getLikedMovies = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        movies: user.likedMovies
      })
    } else {
      return res.json({
        success: false,
        message: 'User not loggedIn'
      })
    }
  }
  catch (e) {
    return res.json({
      success: false,
      message: e.message,
    })
  }
}

export const removeFromLikedMovies = async (req, res, next) => {
  try {
    const { email, movieId } = req.body;
    console.log(email, movieId);
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => (id === movieId));
      if (movieIndex === -1) {
        return res.json({
          success: false,
          message: 'Movie not found'
        })
      }
      likedMovies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(user._id, {
        likedMovies
      }, { new: true })

      return res.json({
        success: true,
        message: "Movie removed from liked list",
        movies: likedMovies
      });
    }
  } catch (e) {
    return res.json({
      success: false,
      message: e.message
    })
  }
}
