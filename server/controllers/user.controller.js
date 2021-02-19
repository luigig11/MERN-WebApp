import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from './error.controller';

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

const list = (req, res) => {
    try {
        let users = await User.find().select('name email created');
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const userById = (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status('400').json({ /*Si algo sale mal revisar ese status('400') ¿deberia ir el 400 entre comillas? */
                error: "user not found"
            })
        }
        req.profile = user;
        next()
    } catch (err) {
        return res.status('400').json({ /*Si algo sale mal revisar ese status('400') ¿deberia ir el 400 entre comillas? */
            error: "Could not retrieve user"
        })
    }
}

const read = (req, res) => { 
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

const update = (req, res, next) => { 
    try {
        let user = req.profile;
        user = extend(user, req.body); //¿Que hace 'extend()'?
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const remove = (req, res, next) => { 
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

export default { create, list, userById, read, remove, update }