import express from 'express';
import { addToLikedMovies, getLikedMovies, removeFromLikedMovies } from '../controller/user.js';

const router = express.Router();

router.post('/addToLike', addToLikedMovies);
router.get('/getLiked/:email', getLikedMovies);
router.put('/removeLiked/', removeFromLikedMovies);

export default router;