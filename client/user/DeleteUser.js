import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import auth from '../auth/auth-helper';
import { remove } from './api-user';
import propTypes from 'prop-types'

const DeleteUser = (props) => {

    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const clickButton = () => {
        setOpen(true);
    }

    const handleRequestClose = () => {
        setOpen(false);
    }

    const deleteAccount = () => {
        const jwt = auth.isAuthenticated();
        remove({ userId: props.userId }, { t: jwt.token })
            .then((data) => {
                if (data && data.error) {
                    console.log(data.error);
                } else {
                    auth.clearJWT(() => console.log('deleted'));
                    setRedirect(true)
                }
            });
    }

    if (redirect) {
        return <Redirect to='/' />
    }

    return (
        <span>
            <IconButton
                aria-label='Delete'
                onClick={clickButton}
                color='secondary'
            >
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>
                    {'Delete Account'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to delete your account
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequestClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={deleteAccount} color='secondary' autoFocus='autoFocus'>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    )

}

DeleteUser.propTypes = {
    userId: propTypes.string.isRequired
}

export default DeleteUser;