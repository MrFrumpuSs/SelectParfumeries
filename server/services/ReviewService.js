import Review from '../models/Review.js';
import Parfum from '../models/Parfum.js';

class ReviewService {
    async create(review) {

        const parfum = await Parfum.findById(review.parfum_id)

        const createdReview = await Review.create(review);
        await createdReview.save();

        parfum.reviews = parfum.reviews.concat(createdReview);
        await parfum.save();

        return createdReview;
    }
}

export default new ReviewService();