import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "config";
import ApiError from '../controllers/ErrorController.js';
class AuthService {
    async register(user) {
        const candidate = await User.findOne({email: user.email});

        if(candidate) {
            throw ApiError.BadRequest('Пользователь с введенным email уже существует');
        }
        const hashPassword = await bcrypt.hash(user.password, 5);
        const createdUser = await User.create({...user, password: hashPassword});
        await createdUser.save();

        return createdUser;
    }

    async login(user) {
        const getUser = await User.findOne({email: user.email});

        if(!getUser) {
            throw ApiError.BadRequest('Пользователя с введенным email не существует');
        }

        const isPasswordValid = bcrypt.compareSync(user.password, getUser.password);
        if(!isPasswordValid) {
            throw ApiError.BadRequest('Не верный пароль');
        }
        

        const token = jwt.sign({id: getUser.id, role: getUser.role}, config.get("secretKey"), {expiresIn: "7d"})

        return {
            token,
            user: {
                id: getUser.id,
                email: getUser.email,
                role: getUser.role,
            }
        }
    }

    async auth(id) {
        const getUser = await User.findById(id);
        
        const token = jwt.sign({id: getUser.id, role: getUser.role}, config.get("secretKey"), {expiresIn: "7d"})

        return {
            token,
            user: {
                id: getUser.id,
                email: getUser.email,
                role: getUser.role,
            }
        }
    }
}

export default new AuthService();