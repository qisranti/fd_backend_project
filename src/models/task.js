import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Task = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'The task name is required'
            },
            notEmpty: {
                msg: 'The task name is required'
            }
        }
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});