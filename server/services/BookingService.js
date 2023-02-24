import Booking from '../models/Booking.js';
import ApiError from '../controllers/ErrorController.js';
import { sendBooking } from '../messages/orderEmail.js';


class BookingService {
    async create(booking) {

        const createdBooking = await Booking.create(booking);
        await createdBooking.save();
        
        await sendBooking(createdBooking);
        
        return createdBooking;
    }

    async updateStatus(order, id) {
        const updatedBooking = await Booking.findOneAndUpdate({_id: id}, order, {new: true});
        return updatedBooking;
    }

    async getAll({limit, page}) {
        let offset = page * limit - limit;
        
        const booking = await Booking.find().sort({'_id' : 'desc'}).limit(limit).skip(offset);
        const bookingcount = await Booking.find().countDocuments();

        return {count: bookingcount, booking};
    }
}

export default new BookingService();