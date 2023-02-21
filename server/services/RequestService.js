import Request from '../models/Request.js';

class RequestService {
    async create(request) {

        const createdRequest = await Request.create(request);
        await createdRequest.save();

        return createdRequest;
    }

    async getAll({limit, page}) {
        let offset = page * limit - limit;
        const request = await Request.find().sort({'_id' : 'desc'}).limit(limit).skip(offset);
        const requestcount = await Request.find().countDocuments();

        return {count: requestcount, request};
    }
}

export default new RequestService();