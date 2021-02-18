import express from 'express'
import userCtrl from '../controllers/user.controller'

const router = express.Router();

router.route('api/users')
    .get(useCtrl.list)
    .post(userCtrl.create)

router.route('api/users/:userid')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove)

router.param('userId', userCtrl.userById)

export default router