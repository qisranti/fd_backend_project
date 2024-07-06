import  { Task } from '../models/task.js';

async function getTasks(req, res) {
    const {userId} = req.user;
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'done'],
            order: [['name', 'ASC']],
            where: {
                userId
            }
        });
        res.json(tasks);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

async function createTask(req, res) {
    const {userId} = req.user;
    const {name} = req.body;
    try {
        const newTask = await Task.create({
            name,
            userId
        });
        res.json(newTask);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

async function getTask(req, res) {
    const {userId} = req.user;
    const {id} = req.params;
    try {
        const task = await Task.findOne({
            attributes: ['name', 'done'],
            where: {
                userId,
                id
            }
        });
        res.json(task);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

async function updateTask(req, res) {
    const {userId} = req.user;
    const {id} = req.params;
    const {name} = req.body;
    try {
        const task = await Task.update({
            name,
        }, {
            where: {
                userId,
                id
            }
        });
        if (task[0] === 0) {
            res.status(404).json({
                message: 'Task not found'
            });
        }
        res.json(task);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

async function taskDone(req, res) {
    const {userId} = req.user;
    const {id} = req.params;
    const {done} = req.body;
    try {
        const task = await Task.update({
            done
        }, {
            where: {
                userId,
                id
            }
        });
        if (task[0] === 0) {
            res.status(404).json({
                message: 'Task not found'
            });
        }
        res.json(task);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

async function deleteTask(req, res) {
    const {userId} = req.user;
    const {id} = req.params;
    try {
        const task = await Task.destroy({
            where: {
                userId,
                id
            }
        });
        res.json(task);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
}

export default {
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask,
}
