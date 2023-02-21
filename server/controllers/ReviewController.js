import ReviewService from '../services/ReviewService.js';

class ReviewController {
    async create(req, res, next) {
        try {
            const { parfum_id, fio, email, text } = req.body;
            const review = await ReviewService.create({ parfum_id, fio, email, text });
            res.json(review);
        } catch (e) {
            next(e);
        }
    }
}

export default new ReviewController();