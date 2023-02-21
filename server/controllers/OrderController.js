import OrderService from '../services/OrderService.js';

class OrderController {
    async create(req, res, next) {
        try {
            const { name, sname, number, email, adress, cart } = req.body;
            const order = await OrderService.create({ name, sname, number, email, adress, cart });
            res.json(order);
        } catch (e) {
            next(e);
        }
    }
    
    async getAll(req, res, next) {
        try {
            let {limit, page} = req.query;
            page = page || 1;
            limit = limit || 20;
            const order = await OrderService.getAll({limit, page});
            res.json(order);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            let { id } = req.params;
            const order = await OrderService.getOne(id);
            res.json(order);
        } catch (e) {
            next(e);
        }
    }
}

export default new OrderController();