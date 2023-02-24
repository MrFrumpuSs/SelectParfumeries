import ReviewService from '../services/ReviewService.js';

class ReviewController {
    async create(req, res, next) {
        try {
            const { parfum_id, fio, email, text } = req.body;
            const img = req.files?.img;
            const url = 'https://' + req.get('host') + ':8080';
            const review = await ReviewService.create({ parfum_id, fio, email, text }, img, url);
            res.json(review);
        } catch (e) {
            next(e);
        }
    }
}

export default new ReviewController();