import logger from '../logs/logger.js';
import  { User } from '../models/user.js';
import { compare } from '../common/bcrypt.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: {
                username
            }
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        
        // Here we compare the password
        if (!(await compare(password, user.password))) {
            return res.status(403).json({
                message: 'User unauthorized'
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: eval(process.env.JWT_EXP_SECONDS),
            }
        );
        return res.json({token});
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

export default {login};