import { create } from './api-user'
import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Icon, makeStyles, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))

const Signup = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    });

    //Forma del handleChange segun el libro: si lo hago de esta forma tengo que pasar el parámetro 'name' en el evento del textinput onChange
    /*  const handleChange = name => event => {
         console.log(event.target.value)
         setValues({ ...values, [name]: event.target.value })
     } */


    //Forma del handleChange con solo la variable 'e' del evento

    const handleChange = e => {
        console.log(e.target.value)
        setValues({ ...values, [e.target.id]: e.target.value })
    }


    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        console.log(user)

        create(user).then((data) => {
            /* console.log(data) */
            if (data.error) {
                /* console.log(data) */
                setValues({ ...values, error: data.error })
            } else {
                /* console.log(data) */
                setValues({ ...values, error: '', open: true })
            }
        })
        
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant='h6' className={classes.title}>
                        Sign Up
                    </Typography>
                    <TextField
                        id='name'
                        label='Name'
                        className={classes.textField}
                        value={values.name}
                        /* onChange={handleChange('name')} */
                        onChange={handleChange}
                        margin='normal'
                    />
                    <br />
                    <TextField
                        id='email'
                        label='Email'
                        type='email'
                        className={classes.textField}
                        value={values.email}
                        /* onChange={handleChange('email')} */
                        onChange={handleChange}
                        margin='normal'
                    />
                    <br />
                    <TextField
                        id='password'
                        label='password'
                        type='password'
                        className={classes.textField}
                        value={values.password}
                        /* onChange={handleChange('email')} */
                        onChange={handleChange}
                        margin='normal'
                    />
                    <br />
                    {
                        values.error && (
                            <Typography component='p' color='error'>
                                <Icon
                                    color='error'
                                    className={classes.error}
                                >
                                    error
                                </Icon>
                                {values.error}
                            </Typography>
                        )
                    }
                </CardContent>
                <CardActions>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={clickSubmit}
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </CardActions>
            </Card>
            <Dialog
                open={values.open}
                disableBackdropClick={true}
            >
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    New account succesfully created
                </DialogContent>
                <DialogActions>
                    <Link to='/signin'>
                        <Button
                            color='primary'
                            autoFocus='autoFocus'
                            variant='contained'
                        >
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default Signup