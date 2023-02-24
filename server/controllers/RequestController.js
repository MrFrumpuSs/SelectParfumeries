import RequestService from '../services/RequestService.js';

class RequestController {
    async create(req, res, next) {
        try {
            const { aroma, fio, number, email } = req.body;
            const request = await RequestService.create({ aroma, fio, number, email });
            res.json(request);
        } catch (e) {
            next(e);
        }
    }

    async updateStatus(req, res, next) {
        try {
            const { status } = req.body;
            const { id } = req.params
            const request = await RequestService.updateStatus({ status }, id);
            res.json(request);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            let {limit, page} = req.query;
            page = page || 1;
            limit = limit || 20;

            const request = await RequestService.getAll({limit, page});
            res.json(request);
        } catch (e) {
            next(e);
        }
    }
}

export default new RequestController();