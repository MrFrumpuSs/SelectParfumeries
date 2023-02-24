import express from "express";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";
import fileUpload from "express-fileupload"
import errorMiddleware from "./middlewares/errorMiddleware.js";

//routers
import authRouter from "./routers/auth.router.js";
import brandRouter from "./routers/brand.router.js";
import parfumRouter from "./routers/parfum.router.js";
import bannerRouter from "./routers/banner.router.js";
import orderRouter from "./routers/order.router.js";
import bookingRouter from "./routers/booking.router.js"
import requestRouter from "./routers/request.router.js"
import reviewRouter from "./routers/review.router.js"

const PORT = config.get('serverPort');

const app = express();

app.use(cors({origin:['https://www.selectparfumeries.ru', 'https://selectparfumeries.ru', 'http://localhost:3000', 'http://www.localhost:3000'],credentials: true}));
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api/auth', authRouter);
app.use('/api/brand', brandRouter);
app.use('/api/parfum', parfumRouter);
app.use('/api/banner', bannerRouter);
app.use('/api/order', orderRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/request', requestRouter);
app.use('/api/review', reviewRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'));

        app.listen(PORT, () => {
            console.log(`Сервер успешно запущен на порту ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();