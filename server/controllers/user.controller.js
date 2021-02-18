import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './error.controller'

const create = async (req, res, next) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: "Succesfully signed up"
        });
    } catch (err) {
        return res.status(400).json({
            err: errorHandler.getErrorMessage(err)
        });
    }
}

const list = (req, res) => {}

const userById = (req, res, next, id) => {}

const read = (req, res) => {}

const update = (req, res, next) => {}

const remove = (req, res, next) => {}

export default {create, list, userById, read, remove, update}