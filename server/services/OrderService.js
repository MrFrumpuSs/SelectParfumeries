import Order from '../models/Order.js';
import Parfum from '../models/Parfum.js';
import ApiError from '../controllers/ErrorController.js';
import mongoose from "mongoose";
import sendOrder from '../messages/orderEmail.js';



class OrderService {
    async create(order) {
        let newArr = [];
        order.cart.forEach(e=>{
            newArr.push(mongoose.Types.ObjectId(e.variation));
        });
        
        const parfums = await Parfum.aggregate([{$unwind: '$variations'}, { $match: {"variations._id": {$in: newArr}} }]);
        let totalPrice = 0;
        

        order.cart.map(async (e)=>{
            parfums.forEach(async (parfum) => {       
                if(e.variation === String(parfum.variations._id)) {
                    await Parfum.findOneAndUpdate({_id: parfum._id}, {sales: parfum.sales + +e.count}, {new: true});
                    if(parfum.sale) {
                        if(parfum.variations.sale) {
                            totalPrice += parfum.variations.sale * e.count;
                        } else {
                            totalPrice += parfum.variations.price * e.count;
                        }
                    } else {
                        totalPrice += parfum.variations.price * e.count;
                    }
                }
            })
        });

        const createdOrder = await Order.create({...order, price: totalPrice});

        await createdOrder.save();

        await sendOrder(createdOrder);

        return createdOrder;
    }
    
    async getAll({limit, page}) {
        let offset = page * limit - limit;

        const orders = await Order.find().sort({'_id' : 'desc'}).limit(limit).skip(offset);
        
        const orderscount = await Order.find().countDocuments();
        
        return {count: orderscount, orders};
    }

    async getOne(id) {
        const order = await Order.find({_id: id}).populate('cart.id', ['name', 'variations']);
        return order;
    }
}

export default new OrderService();