import errorAuth from '../utils/errorAuth.util.js' ;

// error handler middleware - Handels various kinds of errors...
const errorHandler = (err, req, res, next) =>{
    let error = {...err} // spread the message 
    error.message = err.message

    // mongoose cast error
    if(err.name ==="CastError"){
        const message = `Resource not found with id ${err.value}`
        error = new errorAuth(message, 404)
    }

    // mongoose duplicate key error // 11000 is the error code for duplicate key
    else if(err.code === 11000){
        const message = `Duplicate field values...`
        error = new errorAuth(message, 400)
    }
    // Mongoose validation error
    else if(err.name === "ValidationError"){
        const message = `validation Error: ${Object.values(err.errors).map(value => value.message)}`
        error = new errorAuth(message, 400)
        res.status(error.statusCode || 500).json({ // if statusCode is there : 500 is the default status code 
            success: false,
            error: error.message || "Server Error"
        })
    }

    res.status(error.status || 500).json({
        success: false,
        error: error.message || "Server Error"
    });

    next(); // next middleware
}; 


export default errorHandler ; 