import express from 'express'
import { createListing, getUserListings, deleteListing, updateListing} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router.post('/create',verifyToken,createListing);
router.get('/listings/:id',verifyToken,getUserListings);
router.delete('/delete/:id',verifyToken,deleteListing);
router.put('/update/:id',verifyToken,updateListing);

export default router;