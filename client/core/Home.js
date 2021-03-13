import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
//import unicornbikeImg from './../assets/images/unicornbike.jpg'
//import sakuraImg from './../assets/images/digital-draw-of-sakura.jpeg'
import GuapaImg from './../assets/images/Guapa.jpg'
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    }
}))

const Home = () => {
    console.log("Dentro del componente Home")
    //const classes = useStyles();
    return (
        <div>
            <h1>Hola Mundo desde el componente Home</h1>
        </div>
        
       /*  <Card className={classes.card}>
            {console.log("Retornando Cards")}
            <Typography variant='h6' className={classes.title}>
                Home Page
            </Typography>
            <CardMedia className={classes.media} image={unicornbikeImg} title={'Unicorn Bicycle'}/> 
            <CardMedia className={classes.media} image={GuapaImg} title={'Guapa'}/>
            <CardContent>
                <Typography variant={'body2'} component='p'>
                    Welcome to the MERN Skeleton Home Page
                </Typography>
            </CardContent>
        </Card>*/
        
    )
}

export default Home;