import Parfum from '../models/Parfum.js';
import ApiError from '../controllers/ErrorController.js';
import IsJsonString from '../utils/IsJsonString.js';
import mongoose from "mongoose";

import imageUpload from '../utils/imageUpload.js';
import { Console } from 'console';



class ParfumService {
    async create(parfum, img, url) {

        let imgName = await imageUpload(img, url);
        

        const createdParfum = await Parfum.create({...parfum, img: imgName});

        await createdParfum.save();

        return createdParfum;
    }

    async update(parfum, id, img, url) {
        if(img) {
            let imgName = await imageUpload(img, url);
            const updatedParfum = await Parfum.findOneAndUpdate({_id: id}, {...parfum, img: imgName}, {new: true});
            return updatedParfum;
        } else {
            const updatedParfum = await Parfum.findOneAndUpdate({_id: id}, parfum, {new: true});
            return updatedParfum;
        }
        
    }

    async remove(id) {
        const removedParfum = await Parfum.findOneAndDelete({_id: id});

        return {
            message: "Парфюм удален",
            removedParfum
        }
    }

    async getAll({ brandId, sex, sale, sort, order, raspiv, s, limit, page, price, var_ids }) {
        let parfums;
        let offset = page * limit - limit;
        let payload = {};
        let sortpayload = {};
        if(brandId) {
            payload["brand"] = brandId;
        }
        if(sex) {
            payload["sex"] = sex;
        }
        if(sale) {
            payload["sale"] = sale;
        }
        if(s) {
            payload["name"] = {$regex: new RegExp(s, "i")};
        }
        if(raspiv) {
            if(raspiv === 'undefined') {
                payload["raspiv"] = [undefined, false];
            } else {
                payload["raspiv"] = raspiv;
            }
        }
        if(price) {
            let arr = price.split('-');
            if(arr.length > 1) {
                payload["variations.price"] = {$gte: arr[0], $lte: arr[1]};
            } else {
                payload["variations.price"] = {$gte: arr[0]};
            }
        }
        if(sort) {
            if(sort === 'price') {
                sort = 'variations.price';
            }
            if(order) {
                sortpayload[sort] = order;
            } else {
                sortpayload[sort] = 'desc';
            }    
        }
        if(var_ids){
            if(IsJsonString(var_ids)) {
                var_ids = JSON.parse(var_ids);
                if(Array.isArray(var_ids)) {
                    let newArr = [];
                    var_ids.forEach(e=>{
                        newArr.push(mongoose.Types.ObjectId(e));
                    })
                    parfums = await Parfum.aggregate([{$unwind: '$variations'}, { $match: {"variations._id": {$in: newArr}} }]);
                }
            }
        } else {
            parfums = await Parfum.find(payload).limit(limit).skip(offset).populate('brand').sort(sortpayload);
        }
        //payload["variations"] = { $elemMatch: {'quantity': 50}}

        const parfumscount = await Parfum.find(payload).sort(sortpayload).countDocuments();

        let count = parfums.length;

        return {count: parfumscount, parfums};
    }

    async getOne(id) {
        const parfum = await Parfum.find({_id: id}).populate([
            {path: 'brand'},
            {path: 'reviews',
            options: {
                limit: 10,
                sort: { _id: -1},
            } }
        ]);

        return parfum;
    }
}

export default new ParfumService();