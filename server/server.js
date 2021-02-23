import config from '../config/config'
import app from './express'
import mongoose from 'mongoose'

//Estableciendo el puerto
app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info(`Server started on port ${config.port}`)
})

//se configura mongoose para que use promesas de ES6 y maneje la coneccion
//a base de datos MongoDB del proyecto.
console.log("Estableciendo conexion a base de datos")
//mongoose.Promise = global.Promise --esto es para mongoose por debajo de 5x
mongoose.connect(config.mongoUri, {
    
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`)
})
console.log(`Conexion establecida con: ${config.mongoUri}`)