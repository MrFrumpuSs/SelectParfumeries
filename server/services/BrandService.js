import Brand from '../models/Brand.js';
import ApiError from '../controllers/ErrorController.js';

class BrandService {
    async create(brand) {
        const candidate = await Brand.findOne({name: brand.name});

        if(candidate) {
            throw ApiError.BadRequest('Бренд с введенным названием уже существует');
        }
        const createdBrand = await Brand.create(brand);
        await createdBrand.save();

        return createdBrand;
    }

    async update(brand, id) {
        const updatedBrand = await Brand.findOneAndUpdate({_id: id}, brand, {new: true});

        return updatedBrand;
    }

    async remove(id) {
        const removedBrand = await Brand.findOneAndDelete({_id: id});

        return {
            message: "Бренд удален",
            removedBrand
        }
    }

    async getAll() {
        const brands = await Brand.find();

        return {brands};
    }

    async getOne(id) {
        const brand = await Brand.find({_id: id});

        return {brand};
    }
}

export default new BrandService();