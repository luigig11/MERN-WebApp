import {create} from './api-user'
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

    //Forma del handleChange segun el libro:
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    //Forma del handleChange en que lo vi la antes de percatarme que no pasaba el evento
    /* const handleChange = name => {
        setValues({ ...values, [name]: event.target.value })
    } */

    //Forma del handleChange con solo la variable 'e' del evento
    //forma 1
        /* const handleChange = e => {
            setValues({ ...values, [e.target.name]: e.target.value })
        } */

    //forma 2
        /* const handleChange = e => {
            setValues({ ...values, 
                name: e.target.value */
                /* values.name: e.target.value */ 
                /* [values.name]: e.target.value */
           /*  })
        }  */
        
    //Forma del handleChange pasandole name y evento en una variable
    /* const handleChange = (name, e) => {
        setValues({ ...values, 
            name: e.target.values
        })
    } */

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        create(user).then((data) => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, error: '', open: true})
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
                        onChange={handleChange('name')}
                        margin='normal'
                    />
                    <br/>
                    <TextField 
                        id='email' 
                        label='Email'
                        type='email' 
                        className={classes.textField} 
                        value={values.email} 
                        onChange={handleChange('email')}
                        margin='normal'
                    />
                    <br/>
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