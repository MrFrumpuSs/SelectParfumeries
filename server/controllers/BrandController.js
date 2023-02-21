import BrandService from '../services/BrandService.js';

class BrandController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const brand = await BrandService.create({ name });
            res.json(brand);
        } catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { name } = req.body;
            const { id } = req.params
            const brand = await BrandService.update({name}, id);
            res.json(brand);
        } catch (e) {
            next(e);
        }
    }
    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const brand = await BrandService.remove(id);
            res.json(brand);
        } catch (e) {
            next(e);
        }
    }
    async getAll(req, res, next) {
        try {
            const brands = await BrandService.getAll();
            res.json(brands);
        } catch (e) {
            next(e);
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const brand = await BrandService.getOne(id);
            res.json(brand);
        } catch (e) {
            next(e);
        }
    }
}

export default new BrandController();