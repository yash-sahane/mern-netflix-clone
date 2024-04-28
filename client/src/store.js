import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "./main";

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: []
}

export const getGenres = createAsyncThunk('netflix/genres', async () => {
    try {
        const { data } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`);
        return data.genres;
    } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
    }
})

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        });
        if (movie.backdrop_path)
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            });
    });
};

const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const {
            data: { results },
        } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

export const getMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, { getState }) => {
        const { netflix: { genres } } = getState();
        const data = getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${TMDB_API_KEY}`, genres, true);
        return data;
    }
)

export const getMoviesByGenres = createAsyncThunk(
    "netflix/genreMovies",
    async ({ genre, type }, { getState }) => {
        console.log(genre);
        const { netflix: { genres } } = getState();
        const data = getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}&with_genres=${genre}`, genres);
        return data;
    }
)

export const getLikedMovies = createAsyncThunk('netflix/getLikedMovies', async (email) => {
    try {
        const { data: { movies } } = await axios.get(`${server}/users/getLiked/${email}`);
        return movies;
    } catch (error) {
        console.error("Error fetchig movies", error);
        throw error;
    }
})

export const removeFromLikedMovies = createAsyncThunk('netflix/removeLikedMovie', async ({ email, movieId }) => {
    try {
        const { data: { movies } } = await axios.put(`${server}/users/removeLiked`, {
            email, movieId
        });
        return movies;
    } catch (error) {
        console.error("Error fetchig movies", error);
        throw error;
    }
})


const NetflixSlice = createSlice({
    name: 'Netflix',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        })
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(getMoviesByGenres.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(getLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
    }
})

const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer
    }
})

export default store;