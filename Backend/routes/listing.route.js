import express from 'express'
import { createListing, getUserListings, deleteListing, updateListing, getListing, getContactDetails,getListings} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router.post('/create',verifyToken,createListing);
router.get('/listings/:id',verifyToken,getUserListings);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updateListing);
router.get('/get/:id',getListing);
router.get('/contact/:id',verifyToken,getContactDetails);
router.get('/get',getListings);

export default router;