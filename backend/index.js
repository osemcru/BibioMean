import express from "express";
import cors from "cors";
import book from "./routes/book.js"; // me importa la ruta de role
import customer from "./routes/customer.js"; // me importa la ruta de role
import supplier from "./routes/supplier.js"; // me importa la ruta de role
import auth from "./routes/auth.js";
import admin from "./routes/admin.js";
import db from "./db/db.js"; // me importa la conexion de la base de datos
import dotenv from "dotenv"; // me importa la libreria para que se identifiquen las variables de entorno
dotenv.config(); //sirve para cargar al iniciar el programa el .env en la raiz

const app = express();

app.use(express.json()); // para que solo acepte json el servidor
app.use(cors()); // para que el servidor reciba peticiones e interactue con http postman y demas
app.use("/api/book", book);
app.use("/api/customer", customer);
app.use("/api/supplier", supplier);
app.use("/api/auth", auth);
app.use("/api/admin", admin);
app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

db.dbConnection();
