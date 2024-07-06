import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Status } from "../constants/index.js";
import { Task } from "./task.js";
import logger from "../logs/logger.js";
import { compare, encript } from "../common/bcrypt.js";

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'The username is required'
            },
            notEmpty: {
                msg: 'The username is required'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'The password is required'
            },
            notEmpty: {
                msg: 'The password is required'
            }
        }
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate: {
            isIn:{
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: `The status must be ${Status.ACTIVE} or ${Status.INACTIVE}`	
            },
        },
    },
});

// An user has multiple tasks
User.hasMany(Task)
// A task belongs to an user
Task.belongsTo(User)

/*
// Manual Relation
User.hasMany(Task, { 
    foreignKey: 'user_id',
    sourceKey: 'id',
 });

Task.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
});
*/

User.beforeCreate(async (user) => {
    try {
        user.password = await encript(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar');
    }
})

User.beforeUpdate(async (user) => {
    try {
        user.password = await encript(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar');
    }
})