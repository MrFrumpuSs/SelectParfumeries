import Banner from '../models/Banner.js';
import imageUpload from '../utils/imageUpload.js';



class BannerService {
    async create(banner, img, url) {
        let imgName = await imageUpload(img, url); 

        const createdBanner = await Banner.create({...banner, img: imgName[0]});
        await createdBanner.save();

        return createdBanner;
    }

    async update(banner, id, img, url) {
        if(img) {
            let imgName = await imageUpload(img, url);
            const updatedBanner = await Banner.findOneAndUpdate({_id: id}, {...banner, img: imgName[0]}, {new: true});
            return updatedBanner;
        } else {
            const updatedBanner = await Banner.findOneAndUpdate({_id: id}, banner, {new: true});
            return updatedBanner;
        }
        
    }

    async remove(id) {
        const removedBanner = await Banner.findOneAndDelete({_id: id});

        return {
            message: "Баннер удален",
            removedBanner
        }
    }

    async getAll() {
        const banners = await Banner.find();

        return {banners};
    }

    async getOne(id) {
        const banner = await Banner.find({_id: id});

        return {banner};
    }
}

export default new BannerService();