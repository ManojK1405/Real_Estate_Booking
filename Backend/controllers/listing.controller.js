import express from 'express';
import Listing from '../models/listing.model.js';

/* ================= CREATE LISTING ================= */
/* POST /api/listings/create */
export const createListing = async (req, res, next) => {
  try {
    const userId = req.user.userId; // from verifyToken

    const {
      name,
      description,
      address,
      type,
      parking,
      furnished,
      offer,
      bedrooms,
      bathrooms,
      regularPrice,
      discountPrice,
      imageUrls,
    } = req.body;

    // 🔒 VALIDATION
    if (
      !name ||
      !description ||
      !address ||
      !type ||
      bedrooms < 1 ||
      bathrooms < 1 ||
      regularPrice < 1 ||
      !imageUrls ||
      imageUrls.length === 0
    ) {
      return res.status(400).json({
        message: 'All required fields must be filled',
      });
    }

    if (discountPrice && discountPrice >= regularPrice) {
      return res.status(400).json({
        message: 'Discount price must be less than regular price',
      });
    }

    if (imageUrls.length > 6) {
      return res.status(400).json({
        message: 'You can upload a maximum of 6 images',
      });
    }

    const newListing = await Listing.create({
      name,
      description,
      address,
      type, // rent | sell
      parking,
      furnished,
      offer,
      bedrooms,
      bathrooms,
      regularPrice,
      discountPrice,
      imageUrls,
      userRef: userId, 
    });

    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

/* ================= GET USER LISTINGS ================= */
/* GET /api/listings/user/:id */
export const getUserListings = async (req, res, next) => {
  try {
    if (req.user.userId !== req.params.id) {
      return res.status(401).json({
        message: 'You can view only your own listings',
      }); 
    }

    const listings = await Listing.find({
      userRef: req.params.id,
    });

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

/* ================= DELETE LISTING ================= */
/* DELETE /api/listings/delete/:id */
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        message: 'Listing not found',
      });
    }

    if (listing.userRef.toString() !== req.user.userId) {
      return res.status(401).json({
        message: 'You can delete only your own listing',
      });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Listing deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/* ================= UPDATE LISTING ================= */
/* PUT /api/listings/update/:id */
export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        message: 'Listing not found',
      });
    }

    if (listing.userRef.toString() !== req.user.userId) {
      return res.status(401).json({
        message: 'You can update only your own listing',
      });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};


