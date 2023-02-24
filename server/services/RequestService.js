import Request from '../models/Request.js';
import { sendRequest } from '../messages/orderEmail.js';

class RequestService {
    async create(request) {

        const createdRequest = await Request.create(request);
        await createdRequest.save();

        await sendRequest(createdRequest);

        return createdRequest;
    }

    async getAll({limit, page}) {
        let offset = page * limit - limit;
        const request = await Request.find().sort({'_id' : 'desc'}).limit(limit).skip(offset);
        const requestcount = await Request.find().countDocuments();

        return {count: requestcount, request};
    }

    async updateStatus(order, id) {
        const updatedRequest = await Request.findOneAndUpdate({_id: id}, order, {new: true});
        return updatedRequest;
    }
}

export default new RequestService();