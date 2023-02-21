import Booking from '../models/Booking.js';
import ApiError from '../controllers/ErrorController.js';

class BookingService {
    async create(booking) {

        const createdBooking = await Booking.create(booking);
        await createdBooking.save();

        return createdBooking;
    }

    async getAll({limit, page}) {
        let offset = page * limit - limit;
        
        const booking = await Booking.find().sort({'_id' : 'desc'}).limit(limit).skip(offset);
        const bookingcount = await Booking.find().countDocuments();

        return {count: bookingcount, booking};
    }
}

export default new BookingService();