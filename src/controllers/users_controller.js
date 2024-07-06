import  { User } from '../models/user.js';
import logger from '../logs/logger.js';
import { Status } from '../constants/index.js';
import { Task } from '../models/task.js';

async function getUsers(req, res) {
    try {
        logger.info('[userController] getUsers');
        const users = await User.findAll({
            attributes: ['id', 'username', 'status'],
            order: [['id', 'DESC']],
            where: {
                status: Status.ACTIVE
            }
        });
        res.json(users);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

async function createUser(req, res) {
    const body = req.body;
    const {username, password} = req.body
    try {
        logger.info('[userController] createUser: ' + username);
        const newUser = await User.create({
            username,
            password
        });
        return res.json(newUser);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

async function getUser(req, res) {
    const {id} = req.params;
    try {
        logger.info('[userController] getUser: ' + id);
        const user = await User.findOne({
            attributes: ['username', 'status'],
            where: {
                id
            }
        });
        if(!user) { 
            return res.status(404).json({
                message: 'User not found'
            });
        }
        return res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

async function updateUser(req, res) {
    const {id} = req.params;
    const {username, password} = req.body
    try {
        if(!username || !password) {
            return res.status(400).json({
                message: 'No username or password provided'
            })
        }
        logger.info('[userController] updateUser: ' + id);
        const user = await User.update({
            username,
            password
        }, {
            where: {
                id
            }
        });
        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

const activeInactive = async (req, res) => {
    const {id} = req.params;
    const {status} = req.body
    if(!status) {
        return res.status(400).json({
            message: 'No status provided'
        })
    }
    try {
        logger.info('[userController] activateUser: ' + id);
        const user = await User.findByPk(id);
        if(user.status === status){
            return res.status(409).json({
                message: `User aleady ${status}`
            })
        }
        user.status = status
        await user.save();
        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        logger.info('[userController] delete taks from user: ' + id);
        await Task.destroy({
            where: {
                userId: id
            }
        })
        logger.info('[userController] delete user: ' + id);
        const user = await User.destroy({
            where: {
                id
            }
        });
        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

async function getTasks(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username'],
            where: {
                id
            },
            include: [{
                model: Task,
                attributes: ['name', 'done'],
                /*where: {
                    done: false
                }*/
            }]
        });
        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    activeInactive,
    deleteUser,
    getTasks
}