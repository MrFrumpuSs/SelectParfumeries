import BannerService from '../services/BannerService.js';

class BannerController {
    async create(req, res, next) {
        try {
            const { title, description, btnname, link, white } = req.body;
            const img = req.files?.img; 
            const url = 'https://' + req.get('host') + ':8080';
          

            const banner = await BannerService.create({ title, description, btnname, link, white }, img, url);
            res.json(banner);
        } catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { title, description, btnname, link, white } = req.body;
            const img = req.files?.img;
            const url = 'https://' + req.get('host') + ':8080';
            const { id } = req.params
            const banner = await BannerService.update({ title, description, btnname, link, white }, id, img, url);
            res.json(banner);
        } catch (e) {
            next(e);
        }
    }
    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const banner = await BannerService.remove(id);
            res.json(banner);
        } catch (e) {
            next(e);
        }
    }
    async getAll(req, res, next) {
        try {
            const banners = await BannerService.getAll();
            res.json(banners);
        } catch (e) {
            next(e);
        }
    }
}

export default new BannerController();