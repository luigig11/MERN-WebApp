import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from './../helpers/dbErrorHandler';

const create = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: "Succesfully signed up"
        });
    } catch (err) {
        /* console.log(err) */
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
            
        });
    }
}

const list = async (req, res) => {
    try {
        let users = await User.find().select('name email created'); //aqui agregar 'updated' despues de 'email'
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const userById = async (req, res, next, id) => {
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

const update = async (req, res) => { 
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

const remove = async (req, res) => { 
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