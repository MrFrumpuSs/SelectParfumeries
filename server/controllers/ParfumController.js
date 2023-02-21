import ParfumService from '../services/ParfumService.js';
import IsJsonString from '../utils/IsJsonString.js';

class ParfumController {
    async create(req, res, next) {
        try {
            const { name, description, characteristics : characteristicsNotJSON, variations : variationsNotJSON, sex, brand, raspiv } = req.body;
            const img = req.files?.img;
            const url = 'https://' + req.get('host') + ':8080';
            let variations = variationsNotJSON;
            let characteristics = characteristicsNotJSON;
            if(IsJsonString(variationsNotJSON)) {
                variations = JSON.parse(variationsNotJSON);
            }
            if(IsJsonString(characteristicsNotJSON)) {
                characteristics = JSON.parse(characteristicsNotJSON);
            }

            const parfum = await ParfumService.create({ name, description, characteristics, variations, sex, brand, raspiv }, img, url);
            res.json(parfum);
        } catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { name, description, characteristics : characteristicsNotJSON, variations : variationsNotJSON, sex, brand, raspiv } = req.body;
            const img = req.files?.img;
            const url = 'https://' + req.get('host') + ':8080';
            let variations = variationsNotJSON;
            let characteristics = characteristicsNotJSON;
            if(IsJsonString(variationsNotJSON)) {
                variations = JSON.parse(variationsNotJSON);
            }
            if(IsJsonString(characteristicsNotJSON)) {
                characteristics = JSON.parse(characteristicsNotJSON);
            }
            const { id } = req.params
            const parfum = await ParfumService.update({name, description, characteristics, variations, sex, brand, raspiv}, id, img, url);
            res.json(parfum);
        } catch (e) {
            next(e);
        }
    }
    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const parfum = await ParfumService.remove(id);
            res.json(parfum);
        } catch (e) {
            next(e);
        }
    }
    async getAll(req, res, next) {
        try {
            let { brandId, sex, sale, sort, order, raspiv, s, limit, page, price, var_ids } = req.query;
            page = page || 1;
            limit = limit || 10;
            const parfums = await ParfumService.getAll({ brandId, sex, sale, sort, order, raspiv, s, limit, page, price, var_ids });
            res.json(parfums);
        } catch (e) {
            next(e);
        }
    }
    async getOne(req, res, next) {
        try {
            let { id } = req.params;
            const parfum = await ParfumService.getOne(id);
            res.json(parfum);
        } catch (e) {
            next(e);
        }
    }
}

export default new ParfumController();