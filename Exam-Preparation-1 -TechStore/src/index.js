import express from "express"; // 1
import handlebars from "express-handlebars"; //3
import mongoose from "mongoose"; //5

import routes from "./routes.js"; //2
import cookieParser from "cookie-parser"; //10
import { auth } from "./middlewares/authMiddleware.js";  //18

const app = express(); // 1

//DB setup  //5   //Връзка с базата данни
try {
  const uri = "mongodb://localhost:27017/techStore"; //   'mongodb://localhost:27017/{НАШЕ ИМЕ}'
  await mongoose.connect(uri);

  console.log("DB Connected!");
} catch (err) {
  console.error("Cannot connect to DB!");
  console.log(err.message);
}

//Handlebars setup   //3
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions: {     //  Задължително
      allowProtoPropertiesByDefault: true,   //  Задължително
    },
  })
);

app.set("view engine", "hbs"); //3
app.set("views", "./src/views") // настройва самата папка views  

//Express setup
app.use(express.static("src/public")); //за да намира всички статични файлове
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //10
app.use(auth)     //18  //Задължително между тези отгоре и отдолу
app.use(routes); //2

app.listen(3000, () =>console.log("Server is listening on http://localhost:3000...")); // 1
