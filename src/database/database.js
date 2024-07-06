import {Sequelize} from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(
    process.env.DB_DATABASE,// db name
    process.env.DB_USERNAME,// user
    process.env.DB_PASSWORD,// password
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: console.log,
    }
);

