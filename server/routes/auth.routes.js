import express from 'express';
import authCtrol from '../controllers/auth.controller';

const router = express.Router();

router.route('/auth/signin')
    .post(authCtrl.signin);
router.route('/auth/signout')
    .get(authCtrol.signout);

export default router;
