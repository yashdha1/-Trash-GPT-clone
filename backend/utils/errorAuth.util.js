class errorAuth extends Error{
    constructor(message, status){
        super(message); // calling the parent class constructor
        this.status = status; // status code setter 
    }
}

export default errorAuth;