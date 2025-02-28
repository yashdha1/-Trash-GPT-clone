import express from 'express' 
import dotenv from 'dotenv'
import { connectDB } from './config/db.config.js'
import authRoutes from './routes/auth.route.js'
import errorHandler from './middleware/errorAuth.middleware.js'
import path from "path";
// Configuring the environment variables

const __dirname = path.resolve();
dotenv.config() 

// rest OBject 
const app = express() 

// middlewares 
 //setup user authentication routes.....
app.use(express.json()) ;
app.use('/api/v1/auth', authRoutes);
app.use(errorHandler) ; 


// PORT
const PORT = process.env.PORT || 5000;

const stPath = path.resolve(__dirname, "frontend", "dist");
const rsPath = path.resolve(__dirname, "frontend", "dist", "index.html")


// Endpoints 
if (process.env.NODE_ENV.trim() == "production") {
	
    console.log("Current Directory Name: ", rsPath);
	app.use(express.static(stPath));
	app.get("*", (req, res) => {
		res.sendFile(rsPath);
	});
}

app.listen(PORT, async () => {
    await connectDB() ; 
	console.log("Server started at http://localhost:" + PORT);
});