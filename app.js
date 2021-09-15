const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const handlebars = require("express-handlebars");
require("dotenv").config();
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "handlebars");
app.engine(
	"handlebars",
	handlebars({
		layoutsDir: __dirname + "/views/layouts",
		defaultLayout: "index",
	})
);

// database connection
const dbURI = `mongodb+srv://andrewcbuensalida:${process.env.DB_PASSWORD}@cluster0.jm1pi.mongodb.net/my-lesson-12?retryWrites=true&w=majority`;
mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((result) => {
		console.log(`Listening to 3000`);
		app.listen(3000);
	})
	.catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
