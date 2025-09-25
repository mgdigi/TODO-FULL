import express from "express";
import 'dotenv/config'; 
import PropheteRoute  from "./routes/TacheRoute.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/Auth.js";
import { authMiddleware } from "./middlewares/auth.js";
import path from "path";
import cors from "cors";



const app = express();

const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());                                                                                                                                                                                                                                                 

app.use('/auth', AuthRoute);
app.use('/users', UserRoute);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.use(authMiddleware)


app.use('/todos', PropheteRoute);

app.listen(PORT,()=> {
   console.log(`Server is running on port ${PORT}`);
})