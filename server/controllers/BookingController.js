import BookingService from '../services/BookingService.js';

class BookingController {
    async create(req, res, next) {
        try {
            const { brand, aroma, size, quantity, fio, number, email } = req.body;
            const booking = await BookingService.create({ brand, aroma, size, quantity, fio, number, email });
            res.json(booking);
        } catch (e) {
            next(e);
        }
    }

    async updateStatus(req, res, next) {
        try {
            const { status } = req.body;
            const { id } = req.params
            const booking = await BookingService.updateStatus({ status }, id);
            res.json(booking);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            let {limit, page} = req.query;
            page = page || 1;
            limit = limit || 20;

            const booking = await BookingService.getAll({limit, page});
            res.json(booking);
        } catch (e) {
            next(e);
        }
    }
}

export default new BookingController();