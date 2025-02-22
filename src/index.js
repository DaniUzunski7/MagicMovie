import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js'
import showRating from './helpers/ratingHelper.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/authMiddleware.js';
import 'dotenv/config'

const app = express();

try {
  const uri = 'mongodb://localhost:27017/magicMovies'
  await mongoose.connect(uri);

  console.log('DB connected successfully!');
  
} catch (error) {
  console.log('Can not connect to DB!');
  console.log(error);
}

//Handlebars config
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true 
    },
    helpers: {
      showRating
    }
  }),
);

app.set("view engine", "hbs");
app.set("views", "./src/views");

//express config
app.use("/static", express.static("src/public"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authMiddleware)

//Set up routes
app.use(routes);

//Start server
app.listen(5001, () =>
  console.log("Server listening on http://localhost:5001...")
);
