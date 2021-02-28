import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from './../../config/config';

const signin = async (req, res) => {
    try {
        let user = await User.findOne({"email": req.body.email});

        if (!user) {
            return res.status('401').json({error: "user not found"});
        }

        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({error: "Email and password don't match"});
        }

        const token = jwt.sign({_id: user._id}, config.jwtSecret);
        
        res.cookie('t', token, {expire: new Date() + 9999}); //Ante cualquier error, segun la doc esto es 'expires' con s
        
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status('401').json({ error: "could not sign in"});
    }
}

//No funciona :(
const signout = (req, res) => { 
    console.log('Entramos a la funcion clear cookie')
    //console .log(res)
    res.clearCookie("t")    
    return res.status('200').json({
        message: 'signed out'
    });
}

const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['sha1', 'RS256', 'HS256']
})

const hasAuthorization = (req, res, next) => { 
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id; //Aquí se hace solo la comparacion por valor porque req.profile._id y req.auth._id no son del mismo tipo
    console.log(req.profile)
    console.log(req.auth)
    console.log(req.profile._id)
    console.log(req.auth._id)
    if (!(authorized)) {
        return res.status('403').json({
            error: 'User is not authorized'
        });
    }
    next();
}

export default { signin, signout, requireSignin, hasAuthorization }