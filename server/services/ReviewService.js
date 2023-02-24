import Review from '../models/Review.js';
import Parfum from '../models/Parfum.js';
import imageUpload from '../utils/imageUpload.js';

class ReviewService {
    async create(review, img, url) {

        const parfum = await Parfum.findById(review.parfum_id)
        
        if(img) {
            var imgName = await imageUpload(img, url);
        }
        

        const createdReview = await Review.create({...review, img: imgName});
        await createdReview.save();

        parfum.reviews = parfum.reviews.concat(createdReview);
        await parfum.save();

        return createdReview;
    }
}

export default new ReviewService();